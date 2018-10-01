import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IActivityType} from '../../../../../api/models/iactivity-type';
import {ModalDirective} from 'ngx-bootstrap';
import {SubType1Component} from './sub-type1/sub-type1.component';
import {IProjectDailyReport} from '../../../../../api/models/iproject-daily-report';
import {IProjectActivity} from '../../../../../api/models/iproject-activity';
import {DailyReportViewService} from '../daily-report-view.service';
import {SubType2Component} from './sub-type2/sub-type2.component';
import {SubType3Component} from './sub-type3/sub-type3.component';
import {SubType4Component} from './sub-type4/sub-type4.component';
import {SubType5Component} from './sub-type5/sub-type5.component';
import {IProjectCriticalPath} from '../../../../../api/models/iproject-critical-path';
import {IProjectSafety} from '../../../../../api/models/iproject-safety';
import {IProjectWeather} from '../../../../../api/models/iproject-weather';
import {ProjectActivityService} from '../../../../../api/project-activity.service';
import {Ng2DeviceService} from 'ng2-device-detector';

@Component({
  selector: 'app-activity-type',
  templateUrl: './activity-type.component.html',
  styleUrls: ['./activity-type.component.scss']
})
export class ActivityTypeComponent implements OnInit {

  @Input()
  at: IActivityType;
  isCollapsed = true;
  projectActivities: IProjectActivity[] = [];
  index = 2;
  tempIndex = 2;
  title: any;

  @ViewChild('modalSubType1')
  modalSubType1: ModalDirective;
  @ViewChild('modalSubType2')
  modalSubType2: ModalDirective;
  @ViewChild('modalSubType3')
  modalSubType3: ModalDirective;
  @ViewChild('modalSubType4')
  modalSubType4: ModalDirective;
  @ViewChild('modalSubType5')
  modalSubType5: ModalDirective;
  @ViewChild('subType1')
  subType1: SubType1Component;
  @ViewChild('subType2')
  subType2: SubType2Component;
  @ViewChild('subType3')
  subType3: SubType3Component;
  @ViewChild('subType4')
  subType4: SubType4Component;
  @ViewChild('subType5')
  subType5: SubType5Component;
  viewAll = false;


  constructor(private dailyReportViewService: DailyReportViewService,
              private projectActivityService: ProjectActivityService,
              private deviceService: Ng2DeviceService) {
  }

  ngOnInit() {
    this.title = 'Hide Panel';
    this.isCollapsed = !this.deviceService.isDesktop();
    this.dailyReportViewService.addObserverProjectActivities().subscribe((projectActivities: IProjectActivity[]) => {
      this.projectActivities = projectActivities.filter((value: IProjectActivity) => {
        return value.typeId === this.at.id;
      });
      this.projectActivities = this.projectActivities.sort((n1: IProjectActivity, n2: IProjectActivity) => {
        const date1 = new Date(n1.createdAt);
        const date2 = new Date(n2.createdAt);
        if (date1 < date2) {
          return -1;
        }
        if (date1 > date2) {
          return 1;
        }

        return 0;
      });
    });
  }

  add() {
    switch (this.at.subType) {
      case 1:
        this.subType1.setProjectActivity(<IProjectActivity>{createdAt: this.dailyReportViewService.date,
          currentCreatedAt: this.dailyReportViewService.date});
        this.modalSubType1.show();
        break;
      case 2:
        this.subType2.setProjectActivity(<IProjectActivity>{createdAt: this.dailyReportViewService.date,
          currentCreatedAt: this.dailyReportViewService.date});
        this.modalSubType2.show();
        break;
      case 3:
        this.subType3.setProjectActivity(<IProjectWeather>{createdAt: this.dailyReportViewService.date,
        endTime: this.dailyReportViewService.date,
          currentCreatedAt: this.dailyReportViewService.date});
        this.modalSubType3.show();
        break;
      case 4:
        this.subType4.setProjectActivity(<IProjectSafety>{createdAt: this.dailyReportViewService.date,
          currentCreatedAt: this.dailyReportViewService.date});
        this.modalSubType4.show();
        break;
      case 5:
        this.subType5.setProjectActivity(<IProjectCriticalPath>{createdAt: this.dailyReportViewService.date,
          currentCreatedAt: this.dailyReportViewService.date});
        this.modalSubType5.show();
        break;
    }
  }

  remove(projectActivity: IProjectActivity) {
    this.dailyReportViewService.removeProjectActivity(projectActivity);
  }

  edit(projectActivity: IProjectActivity) {
    projectActivity.createdAt = new Date(projectActivity.createdAt);
    projectActivity.currentCreatedAt = this.dailyReportViewService.date;
    switch (this.at.subType) {
      case 1:
        this.subType1.setProjectActivity(projectActivity);
        this.modalSubType1.show();
        break;
      case 2:
        this.subType2.setProjectActivity(projectActivity);
        this.modalSubType2.show();
        break;
      case 3:
        this.subType3.setProjectActivity(projectActivity);
        this.modalSubType3.show();
        break;
      case 4:
        this.subType4.setProjectActivity(projectActivity);
        this.modalSubType4.show();
        break;
      case 5:
        this.subType5.setProjectActivity(projectActivity);
        this.modalSubType5.show();
        break;

    }
  }

  onChangeCheckBoxState(projectActivity: IProjectActivity, checkbox: HTMLInputElement){
    if(jQuery(checkbox).is(':checked')){
      this.dailyReportViewService.addProjectActivity(projectActivity);
    }else if(! jQuery(checkbox).is(':checked')){
        swal({
        title: 'Are you sure?',
        text: "If draft activity it's not checked it won't be included in the daily report",
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove activity',
        cancelButtonText: 'No, keep it',
        buttonsStyling: true,
        reverseButtons: true
      }).then((result) => {
        if (result){
        this.dailyReportViewService.spliceProjectActivitySaved(projectActivity);
        jQuery(checkbox).prop('checked', false);
        return;
        }
      }).catch(swal.noop);
      jQuery(checkbox).prop('checked', true);
    }
  }

  changeTitle(){
    if(!this.isCollapsed){
      this.title = 'Show Panel';
    }else{
      this.title = 'Hide Panel';
    }
  }

  viewAllClick() {
    this.viewAll = !this.viewAll;
    if (this.viewAll) {
      this.index = this.projectActivities.length;
    } else {
      this.index = this.tempIndex;
    }
    this.projectActivities = this.projectActivities;
  }

  save(activity: IProjectActivity) {
    this.dailyReportViewService.addProjectActivity(activity);
  }


}
