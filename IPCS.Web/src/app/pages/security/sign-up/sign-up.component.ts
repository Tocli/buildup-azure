import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../api/account-service.service';
import {IAccount} from '../../../api/models/iaccount';
import {Router} from '@angular/router';
import {BaseComponent} from '../../../base.component';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent extends BaseComponent implements OnInit {

  newAccount: IAccount = <IAccount>{};
  showMsjeWelcome = false;
  showMsjeRegistError = false;
  showForm = true;

  constructor(private as: AccountService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    jQuery('.phone').intlTelInput();
  }

  addRegister(isValid: boolean) {
    if (isValid) {
      this.newAccount.phonenumber = jQuery('.phone').intlTelInput('getNumber');
      this.busy = this.as.save(this.newAccount).$observable.subscribe((data: IAccount) => {
        this.busy = null;
        this.showMsjeWelcome = true;
        this.showForm = false;
      }, (error: any) => {
        this.busy = null;
        swal({type: 'error', title: 'Error', html: error});
      });
    }
  }

}





