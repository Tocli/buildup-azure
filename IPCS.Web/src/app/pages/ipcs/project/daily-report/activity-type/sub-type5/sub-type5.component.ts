import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IActivityType} from '../../../../../../api/models/iactivity-type';
import {IProjectCriticalPath} from '../../../../../../api/models/iproject-critical-path';
import {SubType} from '../sub-type';
import {IProjectActivity} from '../../../../../../api/models/iproject-activity';
import {INgxMyDpOptions} from 'ngx-mydatepicker';


@Component({
  selector: 'app-sub-type5',
  templateUrl: './sub-type5.component.html',
  styleUrls: ['./sub-type5.component.scss']
})
export class SubType5Component extends SubType implements OnInit {

  public dateTimePickerOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  actualStartDateModel: any = null;
  actualEndDateModel: any = null;
  endTimeModel: any = null;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  setProjectActivity(projectActivity: IProjectActivity) {
    super.setProjectActivityCriticalPathIssues(projectActivity);
    const wa: IProjectCriticalPath = <IProjectCriticalPath>projectActivity;
    if (wa.endTime) {
      wa.endTime = new Date(wa.endTime);
      this.endTimeModel = {
        date: {
          month: wa.endTime.getMonth() + 1,
          day: wa.endTime.getDate(),
          year: wa.endTime.getFullYear()
        }
      };
    }

    if (wa.actualStartDate) {
      wa.actualStartDate = new Date(wa.actualStartDate);
      this.actualStartDateModel = {
        date: {
          month: wa.actualStartDate.getMonth() + 1,
          day: wa.actualStartDate.getDate(),
          year: wa.actualStartDate.getFullYear()
        }
      };
    }

    if (wa.actualEndDate) {
      wa.actualEndDate = new Date(wa.actualEndDate);
      this.actualEndDateModel = {
        date: {
          month: wa.actualEndDate.getMonth() + 1,
          day: wa.actualEndDate.getDate(),
          year: wa.actualEndDate.getFullYear()
        }
      };
    }
  }

  dateChangedEndTime(date) {
    const wa: IProjectCriticalPath = <IProjectCriticalPath>this.proyectActivity;
    wa.endTime = date.jsdate;
  }

  dateChangedActualStartDate(date) {
    const wa: IProjectCriticalPath = <IProjectCriticalPath>this.proyectActivity;
    wa.actualStartDate = date.jsdate;
  }

  dateChangedActualEndDate(date) {
    const wa: IProjectCriticalPath = <IProjectCriticalPath>this.proyectActivity;
    wa.actualEndDate = date.jsdate;
  }

  cancel() {
    this.endTimeModel = null;
    super.cancel();
  }

  save(form: any) {
    if (form.valid) {
      const wa: IProjectCriticalPath = <IProjectCriticalPath>this.proyectActivity;
      let momentCreateAt = moment(new Date(wa.createdAt), 'MM/dd/YYYY');
      let momentEndDate = moment(new Date(wa.endTime), 'MM/DD/YYYY');
      if (momentEndDate.isBefore(momentCreateAt) &&
        momentEndDate.format('MM/DD/YYYY') !== momentCreateAt.format('MM/DD/YYYY')) {
        swal({title: 'Error in dates', text: 'Start date can not be greater than end date', type: 'warning'});
        return;
      }
      momentCreateAt = moment(new Date(wa.actualStartDate), 'MM/dd/YYYY');
      momentEndDate = moment(new Date(wa.actualEndDate), 'MM/DD/YYYY');
      if (momentEndDate.isBefore(momentCreateAt) &&
        momentEndDate.format('MM/DD/YYYY') !== momentCreateAt.format('MM/DD/YYYY')) {
        swal({
          title: 'Error in dates',
          text: 'Current start date can not be greater than the current end date', type: 'warning'
        });
        return;
      }
      super.save(form);
    }
  }
}
