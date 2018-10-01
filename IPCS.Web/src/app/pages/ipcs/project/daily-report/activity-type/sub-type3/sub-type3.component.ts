import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IActivityType} from '../../../../../../api/models/iactivity-type';
import {IProjectWeather} from '../../../../../../api/models/iproject-weather';
import {SubType} from '../sub-type';
import {WeatherConditionService} from '../../../../../../api/weather-condition.service';
import {IWhaterCondition} from '../../../../../../api/models/iweather-condition';
import {IProjectActivity} from '../../../../../../api/models/iproject-activity';
import {INgxMyDpOptions} from 'ngx-mydatepicker';


@Component({
  selector: 'app-sub-type3',
  templateUrl: './sub-type3.component.html',
  styleUrls: ['./sub-type3.component.scss']
})
export class SubType3Component extends SubType implements OnInit {

  public dateTimePickerOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  conditions: IWhaterCondition[] = [];
  endDateModel: any = null;
  hours: string;

  constructor(private weatherConditionService: WeatherConditionService) {
    super();
  }

  ngOnInit() {
    this.weatherConditionService.listAll().subscribe((result: IWhaterCondition[]) => {
      this.conditions = result;
    });
  }

  setProjectActivity(projectActivity: IProjectActivity) {
    super.setProjectActivityWeatherIssues(projectActivity);
    const wa: IProjectWeather = <IProjectWeather>projectActivity;
    if (wa.endTime) {
      wa.endTime = new Date(wa.endTime);
      this.endDateModel = {
        date: {
          month: wa.endTime.getMonth() + 1,
          day: wa.endTime.getDate(),
          year: wa.endTime.getFullYear()
        }
      };
      this.changeDates();
    }
  }

  dateChangedEndTime(date) {
    const wa: IProjectWeather = <IProjectWeather>this.proyectActivity;
    wa.endTime = date.jsdate;
    this.changeDates();
  }

  changeDates() {
    const wa: IProjectWeather = <IProjectWeather>this.proyectActivity;
    const end = moment(wa.endTime);
    const startTime = moment(wa.createdAt);
    const duration = moment.duration(end.diff(startTime));
    const hours = duration.asHours();

    // console.log(parseInt(hours.toString(), 0));
    // console.log(Math.round((hours - parseInt(hours.toString(), 0)) * 60));
    this.hours = parseInt(hours.toString(), 0) + ' : '
      + Math.round((hours - parseInt(hours.toString(), 0)) * 60);
  }

  cancel() {
    this.endDateModel = null;
    super.cancel();
  }

  save(form: any) {
    if (form.valid) {
      const wa: IProjectWeather = <IProjectWeather>this.proyectActivity;
      wa.weatherCondition = <IWhaterCondition>this.conditions.filter((value: IWhaterCondition) => {
        return value.id == wa.conditionId
      })[0];

      let m = moment(wa.createdAt);
      if (!m.isValid()) {
        swal({type: 'warning', title: 'Invalid Start Time', text: 'Invalid Start Time'});
        return;
      }

      m = moment(wa.endTime);
      if (!m.isValid()) {
        swal({type: 'warning', title: 'Invalid End Time', text: 'Invalid End Time'});
        return;
      }

      delete wa.weatherCondition['$resource'];
      if (wa.createdAt > wa.endTime) {
        swal({title: 'Error in dates', text: 'Start date can not be greater than end date', type: 'warning'});
        return;
      }
      super.save(form);
    }
  }


}
