import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../api/account-service.service';
import {IResetPassword} from '../../../api/models/ireset-password';
import {BaseComponent} from '../../../base.component';



@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent extends BaseComponent implements OnInit {

  guid: string;
  resetPassword: IResetPassword = <IResetPassword>{};
  showMsjeSetPassword = false;
  showForm = true;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.guid = <string>params.guid;
      this.validateHash(this.guid);
    });
  }

  validateHash(hash: string) {
    this.busy = this.accountService.validForgotPassword({guid: hash})
      .$observable
      .subscribe((result: any) => {
          this.busy = null;
        },
        (error: any) => {
          this.busy = null;
          swal({type: 'error', title: 'Error', text: error}).then(() => {
            this.router.navigate(['/login']);
          });
        });

  }

  changePassword(isValid) {
    if (isValid) {
      this.resetPassword.hash = this.guid;
      this.busy = this.accountService.resetPassword(this.resetPassword).$observable.subscribe(
        (result: any) => {
          this.showMsjeSetPassword = true;
          this.showForm = false;
          this.busy = null;
        }, (error: any) => {
          this.busy = null;
          swal({type: 'error', title: 'Error', text: error});
        }
      );
    }


  }

}
