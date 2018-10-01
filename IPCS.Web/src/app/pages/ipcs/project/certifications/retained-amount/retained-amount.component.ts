import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ProjectCertificationService} from '../../../../../api/project-certification.service';
import {IProjectCertification} from '../../../../../api/models/iproject-certification';
import {ProjectSessionService} from '../../project-session.service';


@Component({
  selector: 'app-retained-amount',
  templateUrl: './retained-amount.component.html',
  styleUrls: ['./retained-amount.component.scss']
})
export class RetainedAmountComponent implements OnInit {

  retained: number;
  @Output()
  save: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  hide = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  setup(retained: number) {
    this.retained = retained;
  }

  saveRetainedAmount(valid: boolean) {
    if (valid) {
      this.save.emit(this.retained);
    }
  }
  onClose() {
    this.hide.emit();
  }

}
