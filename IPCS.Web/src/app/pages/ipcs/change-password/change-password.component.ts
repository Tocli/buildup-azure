import {Component, OnInit} from '@angular/core';
import {IChangePassword} from '../../../api/models/ichange-password';
import {AccountService} from '../../../api/account-service.service';
import {BaseComponent} from '../../../base.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {

  model: IChangePassword = <IChangePassword>{};

  constructor(private accountService: AccountService,
              private router: Router) {
    super();
  }

  ngOnInit() {
  }

  changePassword(isValid) {
    if (isValid) {
      this.busy = this.accountService.changePassword(this.model)
        .$observable.subscribe((ok: any) => {
            this.busy = null;
            this.model = <IChangePassword>{};
            swal({type: 'success', title: 'Change Password', text: 'Success'}).then(() => {
              this.router.navigate(['/']);
            });
          },
          (error: any) => {
            this.busy = null;
            swal({type: 'error', title: 'Error', text: error});
          });
    }

  }

}
