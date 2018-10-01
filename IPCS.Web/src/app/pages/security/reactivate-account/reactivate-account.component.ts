import {Component, OnInit} from '@angular/core';
import {IReactivateAccount} from '../../../api/models/ireactivate-account';
import {AccountService} from '../../../api/account-service.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../../base.component';


@Component({
  selector: 'app-reactivate-account',
  templateUrl: './reactivate-account.component.html',
  styleUrls: ['./reactivate-account.component.scss']
})
export class ReactivateAccountComponent extends BaseComponent implements OnInit {

  reactivateAccountModel: IReactivateAccount = <IReactivateAccount>{};

  constructor(private accountService: AccountService,
              private router: Router) {
    super();
  }

  ngOnInit() {
  }

  sendReactivateAccount(isValid) {
    if (isValid) {
      this.busy = this.accountService.reactivateAccount(this.reactivateAccountModel)
        .$observable
        .subscribe(
          (result: any) => {
            this.busy = null;
            swal({
              type: 'success',
              title: 'Check your account email',
              text: 'Send reactivate account email success'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          }, (err: any) => {
            this.busy = null;
            swal({type: 'error', title: 'Error', text: err});
          });
    }
  }

}
