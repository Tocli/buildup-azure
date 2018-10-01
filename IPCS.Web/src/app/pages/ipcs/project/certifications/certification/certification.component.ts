import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {IProjectCertification} from '../../../../../api/models/iproject-certification';
import {ProjectCertificationService} from '../../../../../api/project-certification.service';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BaseComponent} from '../../../../../base.component';
import {ProjectSessionService} from '../../project-session.service';
import {ICurrency} from '../../../../../api/models/icurrency';
import {CurrencyService} from '../../../../../api/currency.service';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import { NgForm } from '@angular/forms';
import {DecimalPipe} from '@angular/common';



@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent extends BaseComponent implements OnInit {

  newCertification: IProjectCertification = <IProjectCertification>{};
  currencyList: ICurrency[];
  dateModel: any;
  fromModel: any;
  toModel: any;
  title: string;
  @ViewChild('newCertificationForm')
  form: NgForm;

  @Output()
  save: EventEmitter<IProjectCertification> = new EventEmitter<IProjectCertification>();
  @Output()
  cancel = new EventEmitter();

  inputDateFormat: INgxMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
  };

  constructor(public projectSession: ProjectSessionService,
              private currencyService: CurrencyService) {
    super();
  }

  ngOnInit() {
    this.setupCurrencies();
  }

  onAutofillSelectedValue(event){
    const decimalPipe = new DecimalPipe('en-US');
    let regex = /[.,\s]/g;
    let value = event.srcElement.value;
    let valueToString = Number( value.replace(/[^0-9\.]+/g,''));
    this.newCertification.grossAmount = valueToString;
  }

  setup(certification: IProjectCertification, title: string) {
    this.title = title;
    if(!certification.id) {
      this.form.resetForm();
    }
    this.newCertification = Object.assign({}, certification);
    this.setupDate();
  }

  setupCurrencies() {
    this.currencyService.getListCurrency().subscribe((currencyList: ICurrency[]) => {
      this.currencyList = currencyList;
    });
  }

  saveNewCertification(isValid: boolean) {
    if (isValid) {
      if (moment(this.newCertification.from).isAfter(this.newCertification.to)) {
        swal({type: 'error', title: 'Date Error', text: 'The date from can not be greater than the date to'});
        return;
      }
      this.newCertification.projectId = this.projectSession.projectInfo.id;
      this.save.emit(this.newCertification);
    }
  }

  onDateChange(event) {
    this.newCertification.date = event.jsdate;
  }

  onFromChange(event) {
    this.newCertification.from = event.jsdate;
  }

  onToChange(event) {
    this.newCertification.to = event.jsdate;
  }

  onClose() {
    this.newCertification = <IProjectCertification>{};
    this.cancel.emit();
  }

  isValidDate(date: any): Date {
    if (date) {
      const d = new Date(date);
      if (d.getFullYear() === 1 && d.getDate() === 1 && d.getMonth() === 0) {
        return null;
      }
      return d;
    }
    return null;
  }


  setupDate() {
    this.dateModel = null;
    this.fromModel = null;
    this.toModel = null;
    this.newCertification.date = this.isValidDate(this.newCertification.date);
    this.newCertification.from = this.isValidDate(this.newCertification.from);
    this.newCertification.to = this.isValidDate(this.newCertification.to);

    if (this.newCertification.date) {
      this.dateModel = {
        date:
          {
            year: this.newCertification.date.getFullYear(),
            month: this.newCertification.date.getMonth() + 1,
            day: this.newCertification.date.getDate()
          }
      };
    }

    if (this.newCertification.from) {
      this.fromModel = {
        date:
          {
            year: this.newCertification.from.getFullYear(),
            month: this.newCertification.from.getMonth() + 1,
            day: this.newCertification.date.getDate()
          }
      };
    }

    if (this.newCertification.to) {
      this.toModel = {
        date:
          {
            year: this.newCertification.to.getFullYear(),
            month: this.newCertification.to.getMonth() + 1,
            day: this.newCertification.to.getDate()
          }
      };
    }
  }
}
