import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {ProjectSessionService} from '../project-session.service';
import {NewChangeOrderComponent} from './new-change-order/new-change-order.component';
import {IProjectOrder} from '../../../../api/models/iproject-order';
import {ActivatedRoute} from '@angular/router';
import {ProjectOrderService} from '../../../../api/project-order.service';
import {BaseComponent} from '../../../../base.component';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {ICurrency} from '../../../../api/models/icurrency';
import {Subscription} from 'rxjs/Subscription';
import {forEach} from '@angular/router/src/utils/collection';
import {ModalDirective} from 'ngx-bootstrap';
import {BaseModel} from '../../../../api/models/ibase-model';

import { DecimalPipe } from '@angular/common';

export interface IProjectOrderEdit extends BaseModel {
  projectId: number;
  amount: number,
  currencyId: number,
  timeExtension: number,
  userId: number,
  createdAt: Date,
  lastModify: Date,
  description: string,
}

@Component({
  selector: 'app-change-order',
  templateUrl: './change-order.component.html',
  styleUrls: ['./change-order.component.scss']
})
export class ChangeOrderComponent extends BaseComponent implements OnInit {

  orderList: IProjectOrder[];
  projectId: any;
  projectInfo: IProjectInformation;
  subscription: Subscription;
  isNew = false;


  acumAmountForTable: Array<number> = [];
  acumAmount = 0;

  @ViewChild('popupNewOrderComponent')
  popupNewOrderComponent: NewChangeOrderComponent;
  @ViewChild('popupNewOrderModal')
  popupNewOrderModal: ModalDirective;

  constructor(public projectSession: ProjectSessionService,
              public projectOrderService: ProjectOrderService,
              public route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.projectId = params.projectId;
        if (this.projectId) {
          this.busy = this.projectSession.get(this.projectId).subscribe((data) => {
            this.projectInfo = data;
            this.getOrders();
          });
        }
      });
    }
  }

  getOrders() {
    this.projectOrderService.listOrder({projectId: this.projectId}).$observable.subscribe((orderList: Array<IProjectOrder>) => {
      this.busy = null;
      this.orderList = orderList;
      this.calculateAcum();
    })
  }

  calculateAcum() {
    let acumladorAmount = 0;
    let acumTimeExtension = 0;
    this.orderList.forEach((value: IProjectOrder) => {
      acumladorAmount += value.amount;
      acumTimeExtension += value.timeExtension;
      value.acumAmountForTable = (acumladorAmount);
      value.acumTimeExtensionForTable = (acumTimeExtension);
      value.projectNewScdForTable = (moment(this.projectInfo.scd).add(acumTimeExtension, 'days')).toLocaleString();
      value.projectNewEndDateForTable = (moment(this.projectInfo.apsd).add(this.projectInfo.constructDuration, 'days')
        .add(acumTimeExtension, 'days')).toLocaleString();
      value.projectNewContractExpirationDate = (moment(this.projectInfo.apsd).add(this.projectInfo.contractDuration, 'days')
        .add(acumTimeExtension, 'days')).toLocaleString();
    });
  }

  newChangeOrder() {
    this.popupNewOrderComponent.setup(<IProjectOrder>{currencyId: 1, dateSubmited: new Date()}, 'Add New Change Order');
    this.popupNewOrderModal.show();

  }

  save(order: IProjectOrder) {
    this.projectInfo.lastModify = new Date();
    this.projectSession.updateLastModify(this.projectInfo.lastModify);
    if (!order.id) {
      this.busy = this.projectOrderService.add(order).$observable.subscribe(() => {
        this.busy = null;
        this.popupNewOrderModal.hide();
        this.getOrders();
      });
    } else {
      this.busy = this.projectOrderService.save(order).$observable.subscribe(() => {
        this.busy = null;
        this.popupNewOrderModal.hide();
        this.getOrders();
      });
    }
  }

  editChangeOrder(orders: IProjectOrder) {
    this.popupNewOrderModal.show();
    this.popupNewOrderComponent.setup(orders, 'Edit Change Order');
  }

  deleteChangeOrder(orders: IProjectOrder) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this order',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.busy = this.projectOrderService.delete({id: orders.id}).$observable.subscribe(() => {
        this.busy = null;
        this.orderList.splice(this.orderList.indexOf(orders), 1);
      }, () => {
        this.busy = null;
      });
    });
  }
}
