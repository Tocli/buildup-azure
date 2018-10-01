import {Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, Output} from '@angular/core';
import {ProjectSessionService} from '../project-session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectInformationService} from '../../../../api/project-information.service';
import {IProjectDashBoardResponseModel} from '../../../../api/models/iproject-dash-board-response-model';
import {IdashboardModel} from '../../../../api/models/idashboard-model';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {IProjectContact} from '../../../../api/models/iproject-contact';
import {IProjectActivity} from '../../../../api/models/iproject-activity';
import {forEach} from '@angular/router/src/utils/collection';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {IProjectOrder} from '../../../../api/models/iproject-order';
import {IProjectSafety} from '../../../../api/models/iproject-safety';
import {IProjectCertification} from '../../../../api/models/iproject-certification';
import {IProjectCriticalPath} from '../../../../api/models/iproject-critical-path';
import {IProjectWeather} from '../../../../api/models/iproject-weather';
import {AgmMap} from '@agm/core';
import {ControlPosition, MapTypeControlOptions, MapTypeControlStyle} from '@agm/core/services/google-maps-types';
import {
  CircleConfig, DailyReportExport, FontConfig, PdfPosition, SquareConfig, TextAlign,
  TextPosition
} from '../daily-report/daily-report-export';
import {DatePipe, DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {CalendarComponent} from './calendar/calendar.component';
import {PanelIssueComponent} from './panel-issue/panel-issue.component';
import {BaseComponent} from '../../../../base.component';
import { CurrencyPipe } from '@angular/common';
import {ProjectCertificationService} from '../../../../api/project-certification.service';
import {ProjectOrderService} from '../../../../api/project-order.service';
import {ProjectDailyReportService} from '../../../../api/project-daily-report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  today: Date = new Date();
  busy: any;
  day: any;
  originalProjectEndDate: any;
  certification: IProjectCertification[] = [];
  changeOrders: IProjectOrder[] = [];
  totalChangeOrdersAmont: number;
  revisedCostToDate: number;
  certifiedAcumToDate: number;
  projectOrdersCostStatus = false;
  projectOrdersTimeStatus = false;
  projectRiskStatus = 'fsuccess';
  projectSafetyStatus = 'fsuccess';
  initialProjectCost = 0;
  realProjectCost = 0;
  currencySymbol = 'USD';
  certifiedPercentVsRevisedCostToDate = 0;
  acumAmoutn = 0;
  changeOrderPercent = 0;
  revisedCost = 0;
  totalCertified = 0;
  retainedAmountAcum = 0;
  certifiedPercent = 0;
  totalPaid = 0;
  administrativeActivities: IProjectActivity[] = [];
  constructionActivities: IProjectActivity[] = [];
  projectVisitors: IProjectActivity[] = [];
  issuesAffectingCost: IProjectActivity[] = [];
  issuesAffectingSchedule: IProjectActivity[] = [];
  pendingIssues: IProjectActivity[] = [];
  twoWeeksAhead: IProjectActivity[] = [];
  criticalPath: IProjectCriticalPath[] = [];
  safetyIssues: IProjectSafety[] = [];
  weatherIssues: IProjectWeather[] = [];
  projectActivity: IProjectActivity[] = [];
  acumTimeExtension = 0;
  revisedProjectEndDate: Date;
  revisedSubstancialCompletionDate: Date;
  daysConsumed = 0;
  consumedSinceProjectStartDate = 0;
  newContractDuration: Date;
  newContractDurationInDays: any;
  safetyActivities: IProjectActivity[];
  panelScheduleColor = 'panel-success';
  panelAffectCostColor = 'panel-success';
  zoom = 10;
  barChartData: any[];
  chartEstimate: any;
  chartCost: any;
  chartTime: any;
  chartTime2: any;
  chartEstimateImage: any;
  chartCostImage: any;
  chartTimeImage: any;
  chartTime2Image: any;
  calendarImage: any;
  projectInformation: IProjectInformation = null;
  showMap = false;
  @ViewChild(AgmMap)
  agm: any;
  @ViewChild('rowSumary') rowSumary: ElementRef;
  @ViewChild('rowCostSection') rowCostSection: ElementRef;
  @ViewChild('rowCostAnalysis') rowCostAnalysis: ElementRef;
  @ViewChild('rowGraphicsBar') rowGraphicsBar: ElementRef;
  @ViewChild('rowSchedule') rowSchedule: ElementRef;
  @ViewChild('rowCertifiedPercent') rowCertifiedPercent: ElementRef;
  @ViewChild('rowTimeConsumed') rowTimeConsumed: ElementRef;
  @ViewChild('contactmap') contactmap: ElementRef;
  @ViewChild('startDateCalendar') startDateCalendar: CalendarComponent;
  @ViewChild('endDateCalendar') endDateCalendar: CalendarComponent;
  @ViewChild('panelIssuesAfectingCost') panelIssuesAfectingCost: PanelIssueComponent;
  @ViewChild('calendar') calendar: ElementRef;

  constructor(public projectInformationService: ProjectInformationService,
              public route: ActivatedRoute,
              private router: Router,
              public projectCertificationService: ProjectCertificationService,
              public  projectOrderService: ProjectOrderService,
              public dailyReportService: ProjectDailyReportService) {
    super();
    this.barChartData = [{data: [], label: ''}];

  }

  isNullOrUndefined(value:any){
    return value === undefined || value === null;
  }

  isUndefined(value:any){
    return value === undefined;
  }

  ngOnInit() {
    this.agm.scrollwheel = false;
    this.agm.panControl = true;
    this.agm.mapTypeControl = true;
    this.agm.rotateControl = true;
    this.agm.streetViewControl = false;
    this.agm.mapTypeControlOptions = <MapTypeControlOptions>{
      style: MapTypeControlStyle.DEFAULT,
      position: ControlPosition.LEFT_BOTTOM
    };
    if (this.route.params) {
      this.route.params.subscribe((params) => {
        const projectId = params.projectId;
        if (projectId) {
          this.busy = this.projectInformationService.getDashBoard({id: projectId}).$observable.subscribe((projectInformation: IProjectInformation) => {
            if  (!projectInformation.id) {
              this.router.navigate(['not-found']);
            }
            this.projectOrderService.listOrder({projectId: projectId}).$observable.subscribe((data: Array<IProjectOrder>) => {
              this.changeOrders = data;
              this.projectCertificationService.listCertification({projectId: projectId}).$observable.subscribe((data: Array<IProjectCertification>) => {
                this.certification = data;
                this.dailyReportService.getSafetySemaphoreStatus({id: projectId}).$observable.subscribe((status: Array<IProjectActivity>) => {
                  this.safetyActivities = status;
                  console.log(this.safetyActivities);
                  this.setup();
                  this.setupCriticalPathActivities();
                  this.setupCertifiedAcumAmountToDate();
                  this.setupRevisedCostToDate();
                  this.busy = null;
                });
              });
            });
            this.projectInformation = projectInformation;
          }, (error) => {
            this.busy = null;
          });
        }
      });
    }
  }

  setupCertifiedAcumAmountToDate(){
    this.certifiedAcumToDate = 0;
    this.certification.forEach((value: IProjectCertification) => {
      this.certifiedAcumToDate += value.grossAmount;
    });
  }

  setupRevisedCostToDate(){
    this.totalChangeOrdersAmont = 0;
    this.changeOrders.forEach((value: IProjectOrder) => {
      this.totalChangeOrdersAmont += value.amount;
    });
    this.revisedCostToDate = this.totalChangeOrdersAmont + this.projectInformation.originalCost;
  }

  setupCriticalPathActivities(){
    let scheduleStartDate: any = null;
    let scheduleEndDate: any = null;
    let actualStartDate: any = null;
    let actualEndDate: any = null;

    this.criticalPath.forEach((value: IProjectCriticalPath) => {
      scheduleStartDate = value.createdAt;
      scheduleEndDate = value.endTime;
      actualStartDate = value.actualStartDate;
      actualEndDate = value.actualEndDate;

    if( moment(scheduleStartDate).isSameOrAfter(actualStartDate) && moment(scheduleEndDate).isSame(actualEndDate)){
      value.criticalPathActiviestOnSchedule = true;
    }else if(moment(scheduleStartDate).isBefore(actualStartDate) && moment(scheduleEndDate).isSame(actualEndDate)){
      value.criticalPathActiviestOnSchedule = true;
    }else if(moment(scheduleStartDate).isSameOrAfter(actualStartDate) && moment(scheduleEndDate).isAfter(actualEndDate)){
      value.criticalPathActiviestAheadOfSchedule = true;
    }else if(moment(scheduleEndDate).isSameOrAfter(actualEndDate)) {
      value.criticalPathActiviestOnSchedule = true;
    }else if(!moment(scheduleStartDate).isSame(actualStartDate) && moment(scheduleEndDate).isAfter(actualEndDate)){
      value.criticalPathActiviestAheadOfSchedule = true;
    }else if(moment(scheduleStartDate).isSame(actualStartDate) && moment(scheduleEndDate).isBefore(actualEndDate)){
      value.criticalPathActiviestDelayed = true;
    }else if(moment(scheduleStartDate).isBefore(actualStartDate) || moment(scheduleEndDate).isBefore(actualEndDate)){
      value.criticalPathActiviestDelayed = true;
    }else if(!actualEndDate && !actualStartDate){
      value.criticalPathActiviestBlank = true;
    }else if(moment(scheduleStartDate).isSameOrAfter(actualStartDate) && !actualEndDate){
      value.criticalPathActiviestAtRisk = true;
    }else if(moment(scheduleStartDate).isBefore(actualStartDate) && !actualEndDate){
      value.criticalPathActiviestDelayed = true;
    }else{
      value.criticalPathActiviestBlank = true;
    }
    });
  }

  setup() {
    this.setupCertifiedAcumAmountToDate();
    this.setupRevisedCostToDate();
    let acumTimeExtensionDueToChangeOrders = 0;
    this.changeOrders.forEach((value: IProjectOrder) => {
        acumTimeExtensionDueToChangeOrders += value.timeExtension;
    });
    const revisedEndDate = moment(this.projectInformation.apsd).add(this.projectInformation.constructDuration, 'days')
      .add(acumTimeExtensionDueToChangeOrders, 'days').toDate();
    this.projectInformation.opsd = new Date(this.projectInformation.opsd);
    this.projectInformation.endDate = new Date(this.projectInformation.endDate);
    this.startDateCalendar.setup(this.projectInformation.apsd, revisedEndDate, true);
    this.endDateCalendar.setup(this.projectInformation.apsd, revisedEndDate, false);
    if (this.projectInformation.coordinatesX != null && this.projectInformation.coordinatesY != null) {
      this.showMap = !this.isUndefined(this.projectInformation.coordinatesX)
        && !this.isUndefined(this.projectInformation.coordinatesY);
      if (this.showMap) {
        this.projectInformation.coordinatesX = parseFloat(this.projectInformation.coordinatesX.toString());
        this.projectInformation.coordinatesY = parseFloat(this.projectInformation.coordinatesY.toString());
        this.agm.triggerResize().then(() => {
          this.agm._mapsWrapper.setCenter({
            lat: this.projectInformation.coordinatesY,
            lng: this.projectInformation.coordinatesX
          });
        }, () => {});
      }
    }

    this.projectOrdersCostStatus = this.projectInformation.projectOrders.filter((value: IProjectOrder) => {
        return value.amount > 0;
      }).length > 0;
    this.projectOrdersTimeStatus = this.projectInformation.projectOrders.filter((value: IProjectOrder) => {
        return value.timeExtension > 0;
      }).length > 0;
    if (this.projectInformation.budget) {
      this.currencySymbol = this.projectInformation.budget.currency.symbol;
      this.initialProjectCost = this.projectInformation.budget.ammount;
    }
    this.realProjectCost = this.projectInformation.originalCost;
    if (this.projectInformation.projectOrders.length > 0) {
      this.projectInformation.projectOrders.forEach((value: IProjectOrder) => {
        this.acumAmoutn += value.amount;
        this.acumTimeExtension += value.timeExtension;
      });
      this.realProjectCost += this.acumAmoutn;
    }

    this.changeOrderPercent = parseFloat(((this.acumAmoutn / this.projectInformation.originalCost) * 100).toFixed(2));
    if(isNaN(this.changeOrderPercent) || !isFinite(this.changeOrderPercent)){
      this.changeOrderPercent = 0;
    }
    this.revisedCost = this.realProjectCost;
    this.projectInformation.projectCertifications.forEach((value: IProjectCertification) => {
      this.totalCertified += value.grossAmount;
    });
    this.projectInformation.projectCertifications.forEach((value: IProjectCertification) => {
      this.retainedAmountAcum += value.retainedAmount;
    });
    this.projectInformation.projectCertifications.forEach((value: IProjectCertification) => {
      if (value.paid) {
        this.totalPaid += value.grossAmount;
      }
    });
    this.certifiedPercent = parseFloat(((this.totalCertified / this.revisedCost) * 100).toFixed(2));

    if(isNaN(this.certifiedPercent) || !isFinite(this.certifiedPercent)){
      this.certifiedPercent = 0;
    }
        this.certifiedPercentVsRevisedCostToDate = (this.certifiedAcumToDate / this.revisedCostToDate) * 100;
        if(isNaN(this.certifiedPercentVsRevisedCostToDate)
          || !isFinite(this.certifiedPercentVsRevisedCostToDate)
          || this.isNullOrUndefined(this.certifiedPercentVsRevisedCostToDate)){
          this.certifiedPercentVsRevisedCostToDate = 0;
        }
    this.setupGauge(this.certifiedPercentVsRevisedCostToDate);
    this.setupBarCostAnalisys(this.projectInformation.originalCost.toFixed(2), this.acumAmoutn.toFixed(2), this.totalCertified.toFixed(2));
    let originalProjectEndDate = new Date(this.projectInformation.opsd).getTime() + this.projectInformation.contractDuration * 24 * 60 * 60 * 1000;
    let actualProjectEndDate = new Date(this.projectInformation.apsd).getTime() + this.projectInformation.contractDuration * 24 * 60 * 60 * 1000;
    // Time Consumed
    let timeConsumedForTimeConsumedGraph = null;
    let originalTimeForTimeConsumedGraph = null;
    let changeOrderConsumed = null;
    let timeChangeOrderRemaining = null;
    if (new Date() < new Date(this.projectInformation.apsd)) {
      timeConsumedForTimeConsumedGraph = 0;
    } else if ((moment().subtract(new Date(this.projectInformation.apsd))) < (moment(originalProjectEndDate).subtract(new Date(this.projectInformation.apsd)))) {
      timeConsumedForTimeConsumedGraph = (new Date().getTime() - new Date(this.projectInformation.apsd).getTime()) /
        (actualProjectEndDate - new Date(this.projectInformation.apsd).getTime());
    } else {
      timeConsumedForTimeConsumedGraph = ((originalProjectEndDate - (new Date(this.projectInformation.apsd)).getTime()) /
      (actualProjectEndDate - new Date(this.projectInformation.apsd).getTime()));
    }
    //Original Time
    originalTimeForTimeConsumedGraph = ((originalProjectEndDate - new Date(this.projectInformation.apsd).getTime()) /
    (actualProjectEndDate - new Date(this.projectInformation.apsd).getTime()) - timeConsumedForTimeConsumedGraph);
    //Change Order Consumed
    changeOrderConsumed = ((actualProjectEndDate - originalProjectEndDate) /
    (actualProjectEndDate - new Date(this.projectInformation.apsd).getTime()) - changeOrderConsumed);
    //Time Change Order Consumed
    if (originalTimeForTimeConsumedGraph === 0) {
      timeChangeOrderRemaining = ((new Date().getTime() - originalProjectEndDate) /
      (actualProjectEndDate - new Date(this.projectInformation.apsd).getTime()));
    } else {
      timeChangeOrderRemaining = 0;
    }
    this.setupBarTimeConsumed((timeConsumedForTimeConsumedGraph * 100).toFixed(), (originalTimeForTimeConsumedGraph * 100).toFixed(), (changeOrderConsumed * 100).toFixed(), (timeChangeOrderRemaining * 100).toFixed());
    let completion = this.totalCertified;
    if (this.projectInformation.originalCost < completion) {
      completion = this.projectInformation.originalCost;
    }
    const orginalProjectCost = this.projectInformation.originalCost - completion;
    let changeOrderCertified = 0;
    if (this.totalCertified >= this.projectInformation.originalCost) {
      changeOrderCertified = this.totalCertified - this.projectInformation.originalCost;
    }
    const changeOrders = this.acumAmoutn;
    this.setupBarCertifiedPercent(completion, orginalProjectCost, changeOrderCertified, changeOrders);
    const timeConsumed = moment().subtract(new Date(this.projectInformation.apsd));
    const timeConsumed2 = moment(new Date(this.projectInformation.apsd)).subtract(new Date(this.projectInformation.endDate));
    if (moment(timeConsumed).isBefore(moment(timeConsumed2))) {
    }
    this.revisedProjectEndDate = moment(this.projectInformation.apsd).add(this.projectInformation.constructDuration, 'days')
      .add(this.acumTimeExtension, 'days').toDate();
    this.revisedSubstancialCompletionDate = moment(this.projectInformation.scd).add(this.acumTimeExtension, 'days').toDate();
    this.daysConsumed = moment().diff(this.projectInformation.apsd, 'days');
    const num = toNumber(this.daysConsumed / (this.projectInformation.contractDuration + this.acumTimeExtension) * 100);
    this.consumedSinceProjectStartDate = toNumber(num.toFixed(2));
    this.newContractDuration = moment(this.projectInformation.endDate).add(this.acumTimeExtension, 'days');
    this.newContractDurationInDays = this.projectInformation.contractDuration + this.acumTimeExtension;
    // daily report
    if (this.projectInformation.projectDailyReport) {
      this.administrativeActivities = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 1;
      });
      this.constructionActivities = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 2;
      });
      this.projectVisitors = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 3;
      });
      this.safetyIssues = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 4;
      });
      this.weatherIssues = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 6;
      });
      this.pendingIssues = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 7;
      });
      this.criticalPath = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectCriticalPath) => {
        return value.typeId == 5;
      });
      this.twoWeeksAhead = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 8;
      });
      this.issuesAffectingCost = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 9 || value.typeId == 10;
      });
      if (this.issuesAffectingCost.length > 0) {
        const aux = this.issuesAffectingCost.filter((value: IProjectActivity) => {
          return value.typeId == 10;
        }).length;
        if (aux > 0) {
          this.panelAffectCostColor = 'panel-danger';
        } else {
          this.panelAffectCostColor = 'panel-warning';
        }
      }
      this.issuesAffectingSchedule = this.projectInformation.projectDailyReport.projectActivities.filter((value: IProjectActivity) => {
        return value.typeId == 11 || value.typeId == 12;
      });
      if (this.issuesAffectingSchedule.length > 0) {
        const aux = this.issuesAffectingSchedule.filter((value: IProjectActivity) => {
          return value.typeId == 12;
        }).length;
        if (aux > 0) {
          this.panelScheduleColor = 'panel-danger';
        } else {
          this.panelScheduleColor = 'panel-warning';
        }
      }
      let countRiskIssues = this.projectInformation.projectDailyReport.projectActivities.filter((pa: IProjectActivity) => {
        return pa.activityType.subType == 2;
      }).length;
      if (countRiskIssues > 0) {
        countRiskIssues = this.projectInformation.projectDailyReport.projectActivities.filter((pa: IProjectActivity) => {
          return pa.activityType.id == 10 || pa.activityType.id == 12;
        }).length;
        if (countRiskIssues > 0) {
          this.projectRiskStatus = 'fdanger';
        } else {
          this.projectRiskStatus = 'falert';
        }
      }

      //Incident 1
      //Accident 2
      //Near Miss 3
      let countSafety = this.safetyActivities.filter((pa: IProjectActivity) => {
          return pa.safetyId == 2 || pa.safetyId == 3;
        }).length;
      if (countSafety > 0) {
       let countNearMiss = this.safetyActivities.filter((pa: IProjectActivity) => {
          return pa.safetyId == 3;
        }).length;
       let countAccident = this.safetyActivities.filter((pa: IProjectActivity) => {
         return pa.safetyId == 2
       }).length;
        if (countAccident > 0) {
          countNearMiss = 0;
          this.projectSafetyStatus = 'fdanger';
        } else if(countNearMiss > 0) {
          this.projectSafetyStatus = 'falert';
        }
      }
    }
  }

  setupGauge(excedentePercent) {
    this.chartEstimate = AmCharts.makeChart('chartGauge', {
      'type': 'gauge',
      'theme': 'light',
      'axes': [{
        'axisAlpha': 0,
        'tickAlpha': 0,
        'labelsEnabled': false,
        'startValue': 0,
        'endValue': 100,
        'startAngle': 0,
        'endAngle': 360,
        'bands': [{
          'color': '#cecccc',
          'startValue': 0,
          'endValue': 100,
          'radius': '100%',
          'innerRadius': '70%',
          'size': 45
        }, {
          'color': '#0058A1',
          'startValue': 0,
          'endValue': excedentePercent,
          'radius': '100%',
          'innerRadius': '70%',
          'balloonText': excedentePercent.toFixed(2) + ' %',
          'size': 45
        }]
      }],
      'allLabels': [],
      'export': {
        'enabled': true,
        menu: [ ]
      }

    });
  }

  //Old Graph
  /*setupGauge(certifiedToDate, revisedCostToDate, excedentePercent) {
    this.chartEstimate = AmCharts.makeChart('chartGauge', {
      'type': 'gauge',
      'theme': 'light',
      'axes': [{
        'axisAlpha': 0,
        'tickAlpha': 0,
        'labelsEnabled': false,
        'startValue': 0,
        'endValue': 100,
        'startAngle': 0,
        'endAngle': 360,
        'bands': [{
          'color': '#eee',
          'startValue': 0,
          'endValue': certifiedToDate,
          'radius': '100%',
          'innerRadius': '80%',
          'size': 45
        }, {
          'color': '#0058A1',
          'startValue': 0,
          'endValue': revisedCostToDate,
          'radius': '100%',
          'innerRadius': '70%',
          'balloonText': revisedCostToDate + ' USD',
          'size': 45
        }, {
          'color': '#f0ad4e',
          'startValue': 0,
          'endValue': excedentePercent,
          'radius': '80%',
          'innerRadius': '60%',
          'balloonText': excedentePercent + '%',
          'size': 45
        }]
      }],
      'allLabels': [],
      'export': {
        'enabled': true,
        menu: [ ]
      }

    });
  }*/

  setupBarCostAnalisys(projectCost, changeOrderAmount, certifiedDate) {
    this.chartCost = AmCharts.makeChart('chartCostos', {
      'type': 'serial',
      'responsive': {
        'enabled': true
      },
      'legend': {
        'horizontalGap': 10,
        'maxColumns': 3,
        'position': 'bottom',
        'useGraphSettings': true,
        'fontSize': 9,
        'markerSize': 10
      },
      'dataProvider': [{
        'year': 'Project Cost',
        'opc': projectCost,
        'coa': changeOrderAmount
      }, {
        'year': 'Certified to Date',
        'ctd': certifiedDate
      }],
      'valueAxes': [{
        'stackType': 'regular',
        'axisAlpha': 0.3,
        'gridAlpha': 0
      }],
      'graphs': [{
        'fillColors': '#216FC2',
        'fillAlphas': 1,
        'labelText': '[[value]]',
        'lineColor': '#000000',
        'lineAlpha': 0,
        'title': 'Original Project Cost',
        'type': 'column',
        'color': '#000000',
        'valueField': 'opc'
      }, {
        'fillColors': '#F33D03',
        'fillAlphas': 1,
        'labelText': '[[value]]',
        'lineAlpha': 0,
        'title': 'Change Order Amount',
        'type': 'column',
        'color': '#000000',
        'valueField': 'coa'
      }, {
        'fillColors': '#ABDE6B',
        'fillAlphas': 1,
        'labelText': '[[value]]',
        'lineColor': '#000000',
        'lineAlpha': 0,
        'title': 'Certified to Date',
        'type': 'column',
        'color': '#000000',
        'valueField': 'ctd'
      }],
      'categoryField': 'year',
      'categoryAxis': {
        'gridPosition': 'start',
        'axisAlpha': 0,
        'gridAlpha': 0,
        'position': 'left'
      },
      'export': {
        'enabled': true,
        menu : []
      }
    });
  }

  setupBarTimeConsumed(timeConsumed, originalTime, changeOrderConsumed, timeChangeOrderRemaining) {
    this.chartTime = AmCharts.makeChart('chartTime', {
      'type': 'serial',
      'addClassNames': true,
      'responsive': {
        'enabled': true
      },
      'legend': {
        'horizontalGap': 10,
        'maxColumns': 1,
        'position': 'bottom',
        'useGraphSettings': true,
        'markerSize': 10
      },
      'dataProvider': [{
        'year': '',
        'tc': timeConsumed,
        'ot': originalTime,
        'coc': changeOrderConsumed,
        'tco': timeChangeOrderRemaining
      }],
      'valueAxes': [{
        'stackType': '100%',
        'axisAlpha': 0.3,
        'gridAlpha': 0
      }],
      'graphs': [{
        'fillColors': '#7CCB36',
        'fillAlphas': 1,
        'labelText': '[[percents]] %',
        'lineColor': '#000000',
        'lineAlpha': 0.3,
        'title': 'Time Consumed',
        'type': 'column',
        'color': '#000000',
        'valueField': 'tc',
        'balloonText': '[[title]]: <br> [[percents]] %'
      }, {
        'fillColors': '#D5EFBE',
        'fillAlphas': 0.8,
        'labelText': '[[percents]] %',
        'lineAlpha': 0,
        'title': 'Original Time',
        'type': 'column',
        'color': '#000000',
        'valueField': 'ot',
        'balloonText': '[[title]]: <br/> [[percents]] %'
      }, {
        'fillColors': '#F31B14',
        'fillAlphas': 0.8,
        'labelText': '[[percents]] %',
        'lineAlpha': 0,
        'title': 'Change Orders Consumed',
        'type': 'column',
        'color': '#000000',
        'valueField': 'coc',
        'balloonText': '[[title]]: <br/> [[percents]] %'
      }, {
        'fillColors': '#EC7E9C',
        'fillAlphas': 0.8,
        'labelText': '[[percents]] %',
        'lineAlpha': 0,
        'title': 'Time Change Orders Remaining',
        'type': 'column',
        'color': '#000000',
        'valueField': 'tco',
        'balloonText': '[[title]]: <br/> [[percents]] %'
      }],
      'percentFormatter': {
        'precision': 0,
        'decimalSeparator': '.',
        'thousandsSeparator': ','
      },
      'columnWidth': 0.5,
      'rotate': true,
      'categoryField': 'year',
      'categoryAxis': {
        'gridPosition': 'start',
        'axisAlpha': 0,
        'gridAlpha': 0,
        'position': 'left'
      },
      'export': {
        'enabled': true,
        menu : []
      }
    });
  }

  setupBarCertifiedPercent(completion, orginalProjectCost, changeOrderCertified, changeOrders) {
    this.chartTime2 = AmCharts.makeChart('chartCertified', {
      'type': 'serial',
      'responsive': {
        'enabled': true
      },
      'legend': {
        'horizontalGap': 10,
        'maxColumns': 1,
        'position': 'bottom',
        'useGraphSettings': true,
        'markerSize': 10
      },
      'dataProvider': [{
        'year': '',
        'completion': completion,
        'copc': orginalProjectCost,
        'coc': changeOrderCertified,
        'co': changeOrders
      }],
      'valueAxes': [{
        'stackType': '100%',
        'axisAlpha': 0.3,
        'gridAlpha': 0
      }],
      'graphs': [{
        'fillColors': '#7CCB36',
        'fillAlphas': 1,
        'labelText': '[[value]] ([[percents]] %)',
        'lineColor': '#000000',
        'lineAlpha': 0.3,
        'title': 'Certified to Date', /*After Completion*/
        'type': 'column',
        'color': '#000000',
        'valueField': 'completion',
        'balloonText': '[[title]]: <br/> USD [[value]] ([[percents]] %)'
      }, {
        'fillColors': '#D5EFBE',
        'fillAlphas': 0.8,
        'labelText': '[[value]] ([[percents]] %)',
        'lineAlpha': 0.3,
        'title': 'Original Project Cost',
        'type': 'column',
        'color': '#000000',
        'valueField': 'copc',
        'balloonText': '[[title]]: <br/> USD [[value]] ([[percents]] %)'
      }, {
        'fillColors': '#F31B14',
        'fillAlphas': 0.8,
        'labelText': '[[value]] ([[percents]] %)',
        'lineAlpha': 0,
        'title': 'Change Orders Certified',
        'type': 'column',
        'color': '#000000',
        'valueField': 'coc',
        'balloonText': '[[title]]: <br/> USD [[value]] ([[percents]] %)',
      }, {
        'fillColors': '#EC7E9C',
        'fillAlphas': 0.8,
        'labelText': '[[value]] ([[percents]] %)',
        'lineAlpha': 0,
        'title': 'Change Orders',
        'type': 'column',
        'color': '#000000',
        'valueField': 'co',
        'balloonText': '[[title]]: <br/> USD [[value]] ([[percents]] %)',
      }],
      'columnWidth': 0.5,
      'percentFormatter': {
        'precision': 0,
        'decimalSeparator': '.',
        'thousandsSeparator': ','
      },
      'numberFormatter': {
        'precision': 2,
        'decimalSeparator': '.',
        'thousandsSeparator': ','
      },
      'rotate': true,
      'categoryField': 'year',
      'categoryAxis': {
        'gridPosition': 'start',
        'axisAlpha': 0,
        'gridAlpha': 0,
        'position': 'left'
      },
      'export': {
        'enabled': true,
        menu : []
      }
    });
  }

  getTableHeaderColor(styleName: string): string {
    switch (styleName) {
      case 'panel-danger': {
        return '#d9534f';
      }
      case 'panel-success': {
        return '#3c763d';
      }
      // panel-warning
      default: {
        return '#f0ad4e';
      }
    }
  }

  getStatusColor(styleName: string): string {
    switch (styleName) {
      case 'fdanger': {
        return '#d9534f';
      }
      case 'fsuccess': {
        return '#3c763d';
      }
      // panel-warning
      default: {
        return '#f0ad4e';
      }
    }
  }

  colorRgbToArray(colorRgb: any): any[] {
    return [colorRgb.r, colorRgb.g, colorRgb.b];
  }

  getRowsTableCostSection(): any[] {
    const rowsCostSection: any[] = [];
    const decimalPipe = new DecimalPipe('en-US');
    rowsCostSection.push({
      'costSection': 'Original Project Cost:',
      'tipo': this.currencySymbol,
      'value': decimalPipe.transform(this.projectInformation.originalCost, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Total Change Order to Date:',
      'tipo': this.currencySymbol,
      'value': decimalPipe.transform(this.acumAmoutn, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Change Orders (%):',
      'tipo': '%',
      'value': decimalPipe.transform(this.changeOrderPercent, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Revised Cost to Date:',
      'tipo': this.currencySymbol,
      'value': decimalPipe.transform(this.revisedCost, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Total Certified (expenses) to Date:',
      'tipo': this.currencySymbol,
      'value': decimalPipe.transform(this.totalCertified, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Total Retained Amount to Date:',
      'tipo': this.currencySymbol,
      'value': decimalPipe.transform(this.retainedAmountAcum, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Certified Percentage to Date:',
      'tipo': '%',
      'value': decimalPipe.transform(this.certifiedPercent, '1.2-2')
    });
    rowsCostSection.push({
      'costSection': 'Total Paid to Date:',
      'tipo': this.currencySymbol,
      'value': decimalPipe.transform(this.totalPaid, '1.2-2')
    });
    return rowsCostSection;
  }

  getRowsScheduleSection(): any[] {
    const rowsScheduleSection = [];
    const datePipe = new DatePipe('en-US');
    rowsScheduleSection.push({
      'scheduleSection': 'Original Contract Duration:',
      'value': this.projectInformation.contractDuration
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Original Construction Duration:',
      'value': this.projectInformation.constructDuration
    });
    rowsScheduleSection.push({
      'scheduleSection': 'NTP Date:',
      'value': datePipe.transform(new Date(this.projectInformation.npd), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Original Project Start Date:',
      'value': datePipe.transform(new Date(this.projectInformation.opsd), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Revised Project Start Date:',
      'value': datePipe.transform(new Date(this.projectInformation.apsd), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Original Project End Date:',
      'value': datePipe.transform(new Date(this.projectInformation.endDate), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Revised Project End Date:',
      'value': datePipe.transform(new Date(this.revisedProjectEndDate), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Cost Time Extension Due To Change Orders:',
      'value': this.acumTimeExtension
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Original Substantial Completion Date:',
      'value': datePipe.transform(new Date(this.projectInformation.scd), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Revised Substantial Completion Date:',
      'value': datePipe.transform(new Date(this.revisedSubstancialCompletionDate), 'MM/dd/yyyy')
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Days Consumed Since Project Start Date:',
      'value': this.daysConsumed
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Time (%) Consumed Since Project Start Date :',
      'value': this.consumedSinceProjectStartDate
    });
    rowsScheduleSection.push({
      'scheduleSection': 'Contract Time Extension Due To Change Orders:',
      'value': this.acumTimeExtension
    });
    rowsScheduleSection.push({
      'scheduleSection': 'New Contract Duration:',
      'value': datePipe.transform(new Date(this.newContractDuration), 'MM/dd/yyyy')
    });
    return rowsScheduleSection;
  }

  addCostSectionReport(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    let row = [];
    const columnsStyles: any = {};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    report.addSubTitle('Cost Section', PdfPosition.Left);
    report.addSubTitle('Cost Analysis', PdfPosition.Center, TextAlign.Left, 300);
    report.addSpace(10);
    report.addLine(PdfPosition.Right, 300, null);
    report.addLine(PdfPosition.Left, null, 270);
    report.addSpace(10);
    // Cost Section Table
    row = this.getRowsTableCostSection();
    cols = [
      {title: '', dataKey: 'costSection'},
      {title: '', dataKey: 'tipo'},
      {title: '', dataKey: 'value'}
    ];
    report.addTable(cols, row, PdfPosition.Left, defaultColorTableHeader, columnsStyles, 'never', 250);
    report.pdf.addImage(this.chartCostImage, 'PNG', 310, report.currentY + 175, 250, 180);
    // Cost Issues table
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Cost (' + this.issuesAffectingCost.length + ' Issues)', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    columnsStyles.date = {columnWidth: 80};
    columnsStyles.type = {columnWidth: 80};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Type', dataKey: 'type'},
      {title: 'Risk', dataKey: 'risk'},
      {title: 'Mitigation', dataKey: 'mitigation'}];
    row = [];
    this.issuesAffectingCost.forEach((pa: IProjectActivity) => {
      row.push({
        risk: pa.description,
        mitigation: pa.extraField,
        type: pa.typeId === 9 ? 'May Affect' : 'Affect',
        date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')
      });
    });
    const costTableHeaderColor = this.getTableHeaderColor(this.panelAffectCostColor);
    report.addTable(cols, row, PdfPosition.Complete, this.colorRgbToArray(report.hexToRgb(costTableHeaderColor)), columnsStyles, 'firstPage', null, 'No issues affecting cost were registered' );
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addPage(500);
    report.addSubTitle('Certified To Date (%)', PdfPosition.Left);
    report.addSubTitle('Time Consumed (%)', PdfPosition.Center, TextAlign.Left, 300);
    report.addSpace(10);
    report.addLine(PdfPosition.Right, 300, null);
    report.addLine(PdfPosition.Left, null, 270);
    report.addSpace(10);
    report.pdf.addImage(this.chartTimeImage, 'PNG', 320, report.currentY, 250, 150);
    report.pdf.addImage(this.chartTime2Image, 'PNG', 25, report.currentY, 250, 150);
    report.addSpace(200);
  }

  addScheduleSectionReport(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    let row = [];
    const columnsStyles: any = {};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    report.addSubTitle('Schedule Section', PdfPosition.Left);
    report.addSubTitle('Project Schedule', PdfPosition.Center, TextAlign.Left, 300);
    report.addSpace(10);
    report.addLine(PdfPosition.Right, 300, null);
    report.addLine(PdfPosition.Left, null, 270);
    report.addSpace(10);

      report.setupCalendarData(this.projectInformation.apsd, this.revisedProjectEndDate, true);
      report.drawCalendar();
      report.setupCalendarData(this.projectInformation.apsd, this.revisedProjectEndDate, false);
      report.drawCalendar();

    // Cost Section Table
    row = this.getRowsScheduleSection();
    cols = [
      {title: '', dataKey: 'scheduleSection'},
      {title: '', dataKey: 'value'}
    ];
    report.addTable(cols, row, PdfPosition.Left, defaultColorTableHeader, columnsStyles, 'never', 250);
    // Cost Issues table
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Schedule (' + this.issuesAffectingSchedule.length + ' Issues)', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    columnsStyles.date = {columnWidth: 80};
    columnsStyles.type = {columnWidth: 80};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Type', dataKey: 'type'},
      {title: 'Risk', dataKey: 'risk'},
      {title: 'Mitigation', dataKey: 'mitigation'}];
    row = [];
    this.issuesAffectingSchedule.forEach((pa: IProjectActivity) => {
      row.push({
        risk: pa.description,
        mitigation: pa.extraField,
        type: pa.typeId === 11 ? 'May Affect' : 'Affect',
        date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')
      });
    });
    const costTableHeaderColor = this.getTableHeaderColor(this.panelScheduleColor);
    report.addTable(cols, row, PdfPosition.Complete, this.colorRgbToArray(report.hexToRgb(costTableHeaderColor)), columnsStyles, 'firstPage', null, 'No issues affecting schedule were registered' );

  }

  addPendingIssues(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Description', dataKey: 'description'}];
    this.pendingIssues.forEach((pa: IProjectActivity) => {
      row.push({description: pa.description, date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')});
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Pending Issues', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No pending issues');
  }

  addProjectVisitors(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Description', dataKey: 'description'}];
    this.projectVisitors.forEach((pa: IProjectActivity) => {
      row.push({description: pa.description, date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')});
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Project Visitors', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No project visitors');
  }


  addAdministrativeActivities(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Description', dataKey: 'description'}];
    this.administrativeActivities.forEach((pa: IProjectActivity) => {
      row.push({description: pa.description, date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')});
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Administrative Activities', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No administrative activities');
  }

  addConstructionActivities(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Description', dataKey: 'description'}];
    this.constructionActivities.forEach((pa: IProjectActivity) => {
      row.push({description: pa.description, date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')});
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Construction Activities', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No construction activities');
  }

  addTwoWeeksIssues(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Description', dataKey: 'description'}];
    this.twoWeeksAhead.forEach((pa: IProjectActivity) => {
      row.push({description: pa.description, date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')});
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Two Week Look Ahead', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No two week look ahead');
  }

  addCriticalPathIssues(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.risk = {overflow: 'linebreak'};
    columnsStyles.mitigation = {overflow: 'linebreak'};
    columnsStyles.endTime = {columnWidth: 80};
    columnsStyles.actualStartDate = {columnWidth: 80};
    columnsStyles.actualEndDate = {columnWidth: 80};
    cols = [{title: 'Original Start Date', dataKey: 'date'},
      {title: 'Original End Date', dataKey: 'endTime'},
      {title: 'Actual Start Date', dataKey: 'actualStartDate'},
      {title: 'Actual End Date', dataKey: 'actualEndDate'},
      {title: 'Description', dataKey: 'description'}];
    this.criticalPath.forEach((pa: IProjectActivity) => {
      const c = <IProjectCriticalPath>pa;
      row.push({
        description: c.description,
        date: datePipe.transform(new Date(c.createdAt), 'MM/dd/yyyy'),
        endTime: datePipe.transform(new Date(c.endTime), 'MM/dd/yyyy'),
        actualStartDate: c.actualStartDate === null ? '' : datePipe.transform(new Date(c.actualStartDate), 'MM/dd/yyyy'),
        actualEndDate: c.actualEndDate === null ? '' : datePipe.transform(new Date(c.actualEndDate), 'MM/dd/yyyy')
      });
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Critical Path Activities', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No critical path activities');
  }

  addContacts(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.contactPerson = {columnWidth: 80};
    columnsStyles.entity = {columnWidth: 80};
    cols = [{title: 'Contact Person', dataKey: 'contactPerson'},
      {title: 'Entity', dataKey: 'entity'},
      {title: 'Phone', dataKey: 'tel'}];
    this.projectInformation.projectContacts.forEach((pc: IProjectContact) => {
      const w = <IProjectContact>pc;
      row.push({
        contactPerson: w.contactPerson,
        entity: w.entity.name,
        tel: w.tel,
      });
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addPage(250);
    report.addSubTitle('Contact Information', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No project visitors');
  }

  addSafetyIssues(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.type = {columnWidth: 80};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Incident Type', dataKey: 'type'},
      {title: 'Description', dataKey: 'description'}];
    this.safetyIssues.forEach((pa: IProjectActivity) => {
      const s = <IProjectSafety>pa;
      row.push({
        description: s.description,
        type: s.safetyIssue.name,
        date: datePipe.transform(new Date(s.dailyReportDate), 'MM/dd/yyyy')
      });
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addSubTitle('Safety', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No safety issues');
  }

  addWeatherIssues(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const colorBlue = report.hexToRgb('#0058A1');
    let cols = [];
    const row = [];
    const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
    const defaultColorTableHeader = [colorBlue.r, colorBlue.g, colorBlue.b];
    columnsStyles.endTime = {columnWidth: 70};
    columnsStyles.startTime = {columnWidth: 70};
    columnsStyles.condition = {columnWidth: 80};
    cols = [{title: 'Date', dataKey: 'date'},
      {title: 'Start Time', dataKey: 'startTime'},
      {title: 'End Time', dataKey: 'endTime'},
      {title: 'Condition', dataKey: 'condition'},
      {title: 'Description', dataKey: 'description'}];
    this.weatherIssues.forEach((pa: IProjectActivity) => {
      const w = <IProjectWeather>pa;
      row.push({
        description: w.description,
        condition: w.weatherCondition.name,
        date: datePipe.transform(new Date(w.createdAt), 'MM/dd/yyyy'),
        startTime: datePipe.transform(new Date(w.createdAt), 'hh:mm a'),
        endTime: datePipe.transform(new Date(w.endTime), 'hh:mm a')
      });
    });
    report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
    report.addPage(250);
    report.addSubTitle('Weather', PdfPosition.Left);
    report.addSpace(10);
    report.addLine(PdfPosition.Complete);
    report.addSpace(10);
    report.addTable(cols, row, PdfPosition.Complete, defaultColorTableHeader, columnsStyles, 'firstPage', null, 'No weather issues');
  }

  getImageCostAnalysis(): Observable<any> {
    return Observable.create((observer) => {
      /*const ame = new AmCharts.AmExport(this.chartCost, {}, true);
      ame.output({
        format: 'png',
        output: 'datastring'
      }, (chart) => {
        this.chartCostImage = chart;
        observer.next(this.chartCostImage);
      });*/

      this.chartCost.AmExport.capture({}, () => {
        this.chartCost.AmExport.toPNG( {}, ( data ) => {
          this.chartCostImage = data;
            observer.next(this.chartCostImage);
        });
      });
    });
  }

  getChartEstimateImage(): Observable<any> {
    return Observable.create((observer) => {
      /*const ame = new AmCharts.AmExport(this.chartEstimate, {}, true);
      ame.output({
        format: 'png',
        output: 'datastring'
      }, (chart) => {
        this.chartEstimateImage = chart;
        observer.next(this.chartEstimateImage);
      });*/
      this.chartEstimate.AmExport.capture({}, () => {
        this.chartEstimate.AmExport.toPNG( {}, ( data ) => {
          this.chartEstimateImage = data;
          observer.next(this.chartEstimateImage);
        });
      });
    });
  }

  getImageTimeChart(): Observable<any> {
    return Observable.create((observer) => {
      /*const ame = new AmCharts.AmExport(this.chartTime, {}, true);
      ame.output({
        format: 'png',
        output: 'datastring'
      }, (chart) => {
        this.chartTimeImage = chart;
        observer.next(this.chartTimeImage);
      });*/
      this.chartTime.AmExport.capture({}, () => {
        this.chartTime.AmExport.toPNG( {}, ( data ) => {
          this.chartTimeImage = data;
          observer.next(this.chartTimeImage);
        });
      });
    });
  }

  getImageTime2Chart(): Observable<any> {
    return Observable.create((observer) => {
      /*const ame = new AmCharts.AmExport(this.chartTime2, {}, true);
      ame.output({
        format: 'png',
        output: 'datastring'
      }, (chart) => {
        this.chartTime2Image = chart;
        observer.next(this.chartTime2Image);
      });*/
      this.chartTime2.AmExport.capture({}, () => {
        this.chartTime2.AmExport.toPNG( {}, ( data ) => {
          this.chartTime2Image = data;
          observer.next(this.chartTime2Image);
        });
      });
    });
  }

  addEstimateSectionReport(report: DailyReportExport) {
    const datePipe = new DatePipe('en-US');
    const decimalPipe = new DecimalPipe('en-US');
    report.pdf.addImage(this.chartEstimateImage, 'PNG', -2, report.currentY + 11, 135, 135);
    report.addText( decimalPipe.transform(this.certifiedPercentVsRevisedCostToDate, '1.2-2') + '%', <FontConfig>{size: 45, color: '#000000', style: 'bold'},
      <TextPosition>{y: 140, x: 125});
    report.addText('Total Certified to Date: ' + this.currencySymbol + ' ' + decimalPipe.transform(this.certifiedAcumToDate, '1.2-2') , <FontConfig>{
        size: 7,
        color: '#000000',
        style: 'bold'
      },
      <TextPosition>{y: 170, x: 130});
    report.addText('Revised Cost to Date: ' + this.currencySymbol + ' ' + decimalPipe.transform(this.revisedCostToDate, '1.2-2') , <FontConfig>{
        size: 7,
        color: '#000000',
        style: 'bold'
      },
      <TextPosition>{y: 185, x: 130});
    report.addText(datePipe.transform(this.revisedProjectEndDate, 'MM/dd/yyyy'), <FontConfig>{
        size: 28,
        color: '#000000',
        style: 'bold'
      },
      <TextPosition>{y: 140, x: 300});
    report.addText('Expected Project End Date', <FontConfig>{size: 12, color: '#000000', style: 'bold'},
      <TextPosition>{y: 160, x: 305});
    report.addCircle(<CircleConfig>{
      x: 480,
      y: 100,
      radio: 7,
      color: this.getStatusColor(this.projectOrdersCostStatus ? 'fdanger' : 'fsuccess')
    });
    report.addCircle(<CircleConfig>{
      x: 480,
      y: 125,
      radio: 7,
      color: this.getStatusColor(this.projectOrdersTimeStatus ? 'fdanger' : 'fsuccess')
    });
    report.addCircle(<CircleConfig>{x: 480, y: 150, radio: 7, color: this.getStatusColor(this.projectRiskStatus)});
    report.addCircle(<CircleConfig>{x: 480, y: 175, radio: 7, color: this.getStatusColor(this.projectSafetyStatus)});
    report.addText('Cost', <FontConfig>{size: 10, color: '#000000', style: 'normal'},
      <TextPosition>{y: 102, x: 500});
    report.addText('Schedule', <FontConfig>{size: 10, color: '#000000', style: 'normal'},
      <TextPosition>{y: 127, x: 500});
    report.addText('Risk', <FontConfig>{size: 10, color: '#000000', style: 'normal'},
      <TextPosition>{y: 152, x: 500});
    report.addText('Safety', <FontConfig>{size: 10, color: '#000000', style: 'normal'},
      <TextPosition>{y: 177, x: 500});
    report.addSpace(150);
  }

  buildreport() {
    DailyReportExport.createWithLogo().subscribe((report) => {
      const datePipe = new DatePipe('en-US');
      report.addSpace(35);
      report.addTitle('Dashboard Report', PdfPosition.Center, '#ffffff', 11, true)

      if(this.projectInformation.projectName.length < 29)
      {
        report.addTitle(this.projectInformation.projectName, PdfPosition.Left, '#ffffff', 200);

      }else if(this.projectInformation.projectName.match(/^\S*$/)){
        let t = this.projectInformation.projectName;
        let partOne = t.slice(0, 35).trim();
        let partTwo = t.slice(35 + 0, t.length).trim();

        report.addTitle(partOne, PdfPosition.Left, '#ffffff', 200, false);
        report.addTitle(partTwo, PdfPosition.Left, '#ffffff', 200, false, true);
      }else{
        let t = this.projectInformation.projectName;
        let i = t.indexOf(' ', 29);
        let partOne = t.slice(0, i).trim();
        let partTwo = t.slice(i + 0, t.length).trim();

        report.addTitle(partOne, PdfPosition.Left, '#ffffff', 200, false);
        report.addTitle(partTwo, PdfPosition.Left, '#ffffff', 200, false, true);
      }
      report.addTitle(datePipe.transform(new Date(), 'MM/dd/yyyy'), PdfPosition.Right, '#ffffff');
      report.addSpace(10);
      // report.addLine(PdfPosition.Complete);
      report.addSpace(25);
      // Estimate Section
      this.addEstimateSectionReport(report);
      // Cost Section
      this.addCostSectionReport(report);
      // report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
      // report.addPage(400);
      this.addScheduleSectionReport(report);
      this.addPendingIssues(report);
      this.addProjectVisitors(report);
      this.addAdministrativeActivities(report);
      this.addConstructionActivities(report);
      this.addTwoWeeksIssues(report);
      this.addCriticalPathIssues(report);
      this.addContacts(report);
      this.addSafetyIssues(report);
      this.addWeatherIssues(report);
      let name = this.projectInformation.projectName;
      if (name.length > 10) {
        name = this.projectInformation.projectName.substring(0, 10);
      }
      name += '-Dashboard';
      report.save(name);
    });
  }

  printReport() {

    /*this.getCalendar().subscribe(() => {
        this.getImageCostAnalysis().subscribe(() => {
          console.log('getImageCostAnalysis');

          this.getImageTime2Chart().subscribe(() => {
            this.getImageTimeChart().subscribe(() => {
              this.buildreport();
            });
          });

      });
    });*/


      this.getChartEstimateImage().subscribe(() => {
        this.getImageCostAnalysis().subscribe(() => {
          this.getImageTime2Chart().subscribe(() => {
            this.getImageTimeChart().subscribe(() => {
              this.buildreport();
            });
          });
        });
      });
  }
}
