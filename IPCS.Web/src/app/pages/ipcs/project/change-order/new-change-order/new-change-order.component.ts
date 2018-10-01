import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ProjectSessionService} from '../../project-session.service';
import {IProjectOrder} from '../../../../../api/models/iproject-order';
import {ProjectOrderService} from '../../../../../api/project-order.service';
import {ICurrency} from '../../../../../api/models/icurrency';
import {CurrencyService} from '../../../../../api/currency.service';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../../../../base.component';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {ChangeOrderComponent} from '../change-order.component';
import {NgForm} from '@angular/forms';
import {defaultFormatUtc} from 'moment';
import {DecimalPipe} from '@angular/common';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-new-change-order',
  templateUrl: './new-change-order.component.html',
  styleUrls: ['./new-change-order.component.scss']
})
export class NewChangeOrderComponent extends BaseComponent implements OnInit {

  createChangeOrder: IProjectOrder = <IProjectOrder>{};
  currencyList: ICurrency[];
  projectId: number;
  dateSumitedModel: any;
  title: string;

  @ViewChild('newChangeOrder')
  form: NgForm;

  dateSubmitedFormat: INgxMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
  };

  @Output()
  save: EventEmitter<IProjectOrder> = new EventEmitter<IProjectOrder>();
  @Output()
  cancel = new EventEmitter()


  constructor(public projectSessionService: ProjectSessionService,
              public currencyService: CurrencyService,
              public route: ActivatedRoute,
              public projectOrdersService: ProjectOrderService) {
    super();
  }

  ngOnInit() {
    this.setupCurrencies();
    this.setupDates();
    // this.projectOrdersService.getOrderEdit().subscribe((order) => {
    //   this.createChangeOrder = order;
    //   this.setupDates();
    // });

    // this.projectId = this.projectSessionService.projectInfo.id;
    // this.title = this.projectOrdersService.titleModal;
  }

  setup(order: IProjectOrder, title: string) {
    this.title = title;
    if (!order.id) {
     this.form.resetForm();
    }
      this.createChangeOrder = Object.assign({}, order);
      this.setupDates();
  }

  setupCurrencies() {
    this.currencyService.getListCurrency().subscribe((currencyList: ICurrency[]) => {
      this.currencyList = currencyList;
    });
  }

  onClose() {
    this.createChangeOrder = <IProjectOrder>{};
    this.cancel.emit();
  }

  saveNewChangeOrder(isValid: boolean) {
    if (isValid) {
      this.createChangeOrder.projectId = this.projectSessionService.projectInfo.id;
      this.createChangeOrder.userId = this.projectSessionService.projectInfo.lastUser;

      this.save.emit(this.createChangeOrder);
      this.setupDates();
    }
  }

  onCreatedAtChange(event) {
    this.createChangeOrder.createdAt = event.jsdate;
  }

  onDateSubmitedChange(event) {
    this.createChangeOrder.dateSubmited = event.jsdate;
  }

  loadAutoFill(event){
    const decimalPipe = new DecimalPipe('en-US');
    let regex = /[,.\s]/g;
    let value = event.srcElement.value;
    let valueToString = Number( value.replace(/[^0-9\.]+/g,''));
    this.createChangeOrder.amount = valueToString;
  }

  isValidDate(date: any): Date {
    if (date) {
      var d = new Date(date);
      if (d.getFullYear() === 1 && d.getDate() === 1 && d.getMonth() === 0) {
        return null;
      }
      return d;
    }
    return null;
  }

  setupDates() {
    this.dateSumitedModel = null;
    this.createChangeOrder.dateSubmited = this.isValidDate(this.createChangeOrder.dateSubmited);
    if (this.createChangeOrder.dateSubmited) {
      this.dateSumitedModel = {
        date: {
          year: this.createChangeOrder.dateSubmited.getFullYear(),
          month: this.createChangeOrder.dateSubmited.getMonth() + 1,
          day: this.createChangeOrder.dateSubmited.getDate()
        }
      };
    }
  }
}
