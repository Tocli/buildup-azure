import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IActivityType} from '../../../../api/models/iactivity-type';
import {ActivityTypeService} from '../../../../api/activity-type.service';
import {BaseComponent} from '../../../../base.component';
import {ProjectDailyReportService} from '../../../../api/project-daily-report.service';
import {IProjectDailyReport} from '../../../../api/models/iproject-daily-report';
import {ActivatedRoute} from '@angular/router';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {DailyReportViewService} from './daily-report-view.service';
import {ProjectInformationService} from '../../../../api/project-information.service';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {SafetyIssueService} from '../../../../api/safety-issue.service';
import {WeatherConditionService} from '../../../../api/weather-condition.service';
import {IWhaterCondition} from '../../../../api/models/iweather-condition';
import {ISafetyIssue} from '../../../../api/models/isafety-issue';
import {Ng2DeviceService} from 'ng2-device-detector';
import {ModalDirective} from 'ngx-bootstrap';
import {DailyReportExport, PdfPosition} from './daily-report-export';
import {DatePipe} from '@angular/common';
import {pipeDef} from '@angular/core/src/view';
import {IProjectActivity} from '../../../../api/models/iproject-activity';
import {IProjectWeather} from '../../../../api/models/iproject-weather';
import {IProjectSafety} from '../../../../api/models/iproject-safety';
import {IProjectCriticalPath} from '../../../../api/models/iproject-critical-path';
import {ProjectSessionService} from '../project-session.service';
import {CanDeactivatePopupComponent} from "./can-deactivate-popup/can-deactivate-popup.component";

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent extends BaseComponent implements OnInit {

  activitiesType: IActivityType[] = [];
  leftActivities: IActivityType[] = [];
  centerActivities: IActivityType[] = [];
  rightActivities: IActivityType[] = [];
  projectInformation: IProjectInformation = null;
  showDraftTitle: any = false;
  draftDate: any;
  projectActivities: IProjectActivity[] = [];
  @ViewChild('modalPdf')
  modalPdf: ModalDirective;



  constructor(private activityTypeService: ActivityTypeService,
              private route: ActivatedRoute,
              private projectInformationService: ProjectSessionService,
              public dailyReportViewService: DailyReportViewService,
              private viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnInit() {
    this.dailyReportViewService.nextVisible = false;
    this.dailyReportViewService.date = new Date();
    this.dailyReportViewService.viewContainerRef = this.viewContainerRef;
    this.dailyReportViewService.busy = this.activityTypeService.list().$observable.subscribe((activitiesType: IActivityType[]) => {
        this.activitiesType = activitiesType;
        this.setupActivitiesType();
        this.findDailyReport();
        this.dailyReportTitle();
      },
      () => {
        this.busy = null;
      });
  }

  dailyReportTitle(){
     this.showDraftTitle = false;
  }

  setupActivitiesType() {
    this.leftActivities = this.activitiesType.filter((type: IActivityType) => {
      return type.column === 1;
    });

    this.centerActivities = this.activitiesType.filter((type: IActivityType) => {
      return type.column === 2;
    });

    this.rightActivities = this.activitiesType.filter((type: IActivityType) => {
      return type.column === 3;
    });
  }

  findDailyReport() {
    this.route.params.subscribe((params) => {
        this.projectInformationService.get(params.projectId).subscribe((projectInformation: IProjectInformation) => {
          this.projectInformation = projectInformation;
          this.dailyReportViewService.findDailyReportByDate(toNumber(params.projectId));
        });
    });
  }

  print() {
    DailyReportExport.createWithLogo().subscribe((report) => {
      report.addSpace(35);
      report.addTitle('Daily Report', PdfPosition.Center, '#ffffff', 25, true)
      if(this.projectInformation.projectName.length < 29){
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
      const datePipe = new DatePipe('en-US');
      report.addTitle(datePipe.transform(this.dailyReportViewService.date, 'MM/dd/yyyy'), PdfPosition.Right, '#ffffff');
      report.addSpace(10);
      // report.addLine(PdfPosition.Complete);
      report.addSpace(55);

      this.activitiesType.forEach((value: IActivityType) => {
        report.addSubTitle(value.name, PdfPosition.Left);
        report.addSpace(10);
        report.addLine(PdfPosition.Complete);
        report.addSpace(10);
        let color: any;
        switch (value.class) {
          case 'panel-warning':
            color = report.hexToRgb('#F4AF39');
            break;
          case 'panel-danger':
            color = report.hexToRgb('#6a00a1');
            break;
          default:
            color = report.hexToRgb('#0058A1');
            break;
        }
        let cols = [];
        let row = [];
        const columnsStyles: any = {date: {columnWidth: 80}, description: {overflow: 'linebreak'}};
        const rowsItems = this.dailyReportViewService.dailyReport.projectActivities.filter((projectActivity: IProjectActivity) => {
          if(!projectActivity.isDraft){
            return projectActivity.typeId === value.id;
          }else{
            return projectActivity.typeId === null;
          }
        });
        if (value.subType === 1) {
          cols = [{title: 'Date', dataKey: 'date'},
            {title: 'Description', dataKey: 'description'}];
          rowsItems.forEach((pa: IProjectActivity) => {
            row.push({
              description: pa.description,
               date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')
            });
          });
        }
        if (value.subType === 2) {
          columnsStyles.risk = {overflow: 'linebreak'};
          columnsStyles.mitigation = {overflow: 'linebreak'};
          cols = [{title: 'Date', dataKey: 'date'},
            {title: 'Risk', dataKey: 'risk'},
            {title: 'Mitigation', dataKey: 'mitigation'}];
          rowsItems.forEach((pa: IProjectActivity) => {
            row.push({
              risk: pa.description,
              mitigation: pa.extraField,
              date: datePipe.transform(new Date(pa.dailyReportDate), 'MM/dd/yyyy')
            });
          });
        }

        if (value.subType === 3) {
          columnsStyles.endTime = {columnWidth: 70};
          columnsStyles.startTime = {columnWidth: 70};
          columnsStyles.condition = {columnWidth: 80};
          cols = [{title: 'Date', dataKey: 'date'},
            {title: 'Start Time', dataKey: 'startTime'},
            {title: 'End Time', dataKey: 'endTime'},
            {title: 'Condition', dataKey: 'condition'},
            {title: 'Description', dataKey: 'description'}];
          rowsItems.forEach((pa: IProjectActivity) => {
            const w = <IProjectWeather>pa;
            row.push({
              description: w.description,
              condition: w.weatherCondition.name,
              date: datePipe.transform(new Date(w.createdAt), 'MM/dd/yyyy'),
              endTime: datePipe.transform(new Date(w.endTime), 'hh:mm a'),
              startTime: datePipe.transform(new Date(w.createdAt), 'hh:mm a'),
            });
          });
        }
        if (value.subType === 4) {
          columnsStyles.type = {columnWidth: 80};
          cols = [{title: 'Date', dataKey: 'date'},
            {title: 'Incident Type', dataKey: 'type'},
            {title: 'Description', dataKey: 'description'}];
          rowsItems.forEach((pa: IProjectActivity) => {
            const s = <IProjectSafety>pa;
            row.push({
              description: s.description,
              type: s.safetyIssue.name,
              date: datePipe.transform(new Date(s.dailyReportDate), 'MM/dd/yyyy')
            });
          });
        }
        if (value.subType === 5) {
          columnsStyles.endTime = {columnWidth: 80};
          columnsStyles.actualStartDate = {columnWidth: 80};
          columnsStyles.actualEndDate = {columnWidth: 80};
          cols = [{title: 'Original Start Date', dataKey: 'date'},
            {title: 'Original End Date', dataKey: 'endTime'},
            {title: 'Actual Start Date', dataKey: 'actualStartDate'},
            {title: 'Actual End Date', dataKey: 'actualEndDate'},
            {title: 'Description', dataKey: 'description'}];
          rowsItems.forEach((pa: IProjectActivity) => {
            const c = <IProjectCriticalPath>pa;
            row.push({
              description: c.description,
              date: datePipe.transform(new Date(c.createdAt), 'MM/dd/yyyy'),
              endTime: datePipe.transform(new Date(c.endTime), 'MM/dd/yyyy'),
              actualStartDate: c.actualStartDate === null ? '' : datePipe.transform(new Date(c.actualStartDate), 'MM/dd/yyyy'),
              actualEndDate: c.actualEndDate === null ? '' : datePipe.transform(new Date(c.actualEndDate), 'MM/dd/yyyy')
            });
          });
        }
        report.addTable(cols, row, PdfPosition.Complete, [color.r, color.g, color.b], columnsStyles, 'firstPage', null, value.description);
        report.setCurrentY(report.pdf.autoTable.previous.finalY + 25);
      });

      let name = this.projectInformation.projectName;
      if (name.length > 10) {
        name = this.projectInformation.projectName.substring(0, 10);
      }
      name += '-DailyReport'
      report.save(name);
    });

  }


  printReport() {

  }

}
