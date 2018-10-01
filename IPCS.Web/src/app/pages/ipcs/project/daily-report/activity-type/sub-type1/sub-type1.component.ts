import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IActivityType} from '../../../../../../api/models/iactivity-type';
import {IProjectActivity} from '../../../../../../api/models/iproject-activity';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {SubType} from '../sub-type';


@Component({
  selector: 'app-sub-type1',
  templateUrl: './sub-type1.component.html',
  styleUrls: ['./sub-type1.component.scss']
})
export class SubType1Component extends SubType implements OnInit {

  public dateTimePickerOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  constructor() { super(); }

  ngOnInit() {

  }

  save(form: any) {
    if (form.valid) {
      const m = moment(this.proyectActivity.createdAt);
      if (!m.isValid()) {
        swal({type: 'warning', title: 'Invalid Date', text: 'Invalid Date and Time'});
        return;
      }
      super.save(form);
    }
  }
}
