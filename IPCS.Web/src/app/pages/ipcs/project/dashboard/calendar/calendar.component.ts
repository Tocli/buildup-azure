import {Component, Input, OnInit} from '@angular/core';

interface Week {
  days: any[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input()
  isStart = true;

  startDate: Date;
  endDate: Date;
  date: Date;
  show = false;
  weeks: Week[] = [];

  month: string;
  year: string;
  weekDays: any[];

  constructor() { }

  ngOnInit() {

  }


  setup(startDate: Date, endDate: Date, isStart: boolean) {
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.isStart = isStart;

    if (this.startDate == null || this.endDate === null) {
      return;
    }

    if (this.isStart) {
      this.date = new Date(this.startDate);
    } else {
      this.date = new Date(this.endDate);
    }
    let m = moment(this.date).date(1);
    this.month = m.format('MMMM');
    this.year = m.format('YYYY');
    this.weekDays = moment.weekdaysShort();
    const mEnd = moment(this.endDate);
    const mStart = moment(this.startDate);

    this.show = (m.format('MM/YYYY') === mEnd.format('MM/YYYY') && this.isStart) ||
      moment(this.startDate).format('MM/YYYY') !== mEnd.format('MM/YYYY');

    if (this.show) {
      let inDay = false;
      const dayWeek = m.day();
      if (dayWeek > 1) {
        m = m.subtract(dayWeek, 'day');
      }


      for (let i = 0; i < 5; i++) {
        const week = <Week>{ days: []};
        this.weeks.push(week);
        for (let j = 0; j < 7; j++) {
          m = m.add(1, 'day');
          const day = {label: m.format('DD'), clazz: ''};
          if (m.isAfter(mStart)  && m.isBefore(mEnd)) {
            day.clazz = 'in';
          }
          if (m.isAfter(mEnd) && m.isAfter(mStart) && moment().isAfter(mEnd)) {
            day.clazz = 'out';
          }
          if (m.format( 'DDMMYYYY')  ===  moment(this.date).format( 'DDMMYYYY') ) {
            day.clazz = 'current';
          }
          if (m.format( 'DDMMYYYY') === mEnd.format( 'DDMMYYYY')) {
            day.clazz = 'current';
          }
          /*if (mEnd.dayOfYear() < moment().dayOfYear() && m.dayOfYear() > mEnd.dayOfYear()) {
            day.clazz = 'out';
          }*/
          week.days.push(day);
        }
      }
    }
  }

}
