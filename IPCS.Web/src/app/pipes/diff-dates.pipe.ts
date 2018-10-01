import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diffdates'
})
export class DiffDatesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const end = moment(args);
    const startTime = moment(value);
    const duration = moment.duration(end.diff(startTime));
    const hours = duration.asHours();

    // console.log(parseInt(hours.toString(), 0));
    // console.log(Math.round((hours - parseInt(hours.toString(), 0)) * 60));
    let minutesString = '0' + Math.round((hours - parseInt(hours.toString(), 0)) * 60);
    minutesString = minutesString.substring(minutesString.length - 2, 3);
    let hoursString = '0' + parseInt(hours.toString(), 0);
    hoursString = hoursString.substring(hoursString.length - 2, 3);
    return hoursString + ':' + minutesString + ' hs';
  }

}
