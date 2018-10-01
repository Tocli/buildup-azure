import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IActivityType} from '../../../../../../api/models/iactivity-type';
import {IProjectActivity} from '../../../../../../api/models/iproject-activity';
import {SubType} from '../sub-type';
import {INgxMyDpOptions} from 'ngx-mydatepicker';


@Component({
  selector: 'app-sub-type2',
  templateUrl: './sub-type2.component.html',
  styleUrls: ['./sub-type2.component.scss']
})
export class SubType2Component extends SubType implements OnInit {

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
        swal({type: 'warning', title: 'Invalid Date', text: 'Invalid Time'});
        return;
      }
      super.save(form);
    }
  }


}
