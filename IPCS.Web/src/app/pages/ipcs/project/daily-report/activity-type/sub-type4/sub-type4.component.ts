import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IActivityType} from '../../../../../../api/models/iactivity-type';
import {IProjectSafety} from '../../../../../../api/models/iproject-safety';
import {SubType} from '../sub-type';
import {ISafetyIssue} from '../../../../../../api/models/isafety-issue';
import {SafetyIssueService} from '../../../../../../api/safety-issue.service';
import {INgxMyDpOptions} from 'ngx-mydatepicker';


@Component({
  selector: 'app-sub-type4',
  templateUrl: './sub-type4.component.html',
  styleUrls: ['./sub-type4.component.scss']
})
export class SubType4Component extends SubType implements OnInit {

  public dateTimePickerOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  safetyIssues: ISafetyIssue[] = [];

  constructor(private safetyIssueService: SafetyIssueService) {
    super();
  }

  ngOnInit() {
    this.safetyIssueService.listAll().subscribe((result: ISafetyIssue[]) => {
      this.safetyIssues = result;
    });
  }

  save(form: any) {
    if (form.valid) {
      const ps = <IProjectSafety>this.proyectActivity;
      ps.safetyIssue = <ISafetyIssue>this.safetyIssues.filter((value: ISafetyIssue) => {
        return value.id == ps.safetyId
      })[0];

      const m = moment(ps.createdAt);
      if (!m.isValid()) {
        swal({type: 'warning', title: 'Invalid Date Time', text: 'Invalid Date Time'});
        return;
      }


      delete ps.safetyIssue['$resource'];
      super.save(form);

    }
  }
}
