import {Component, OnInit, ViewChild} from '@angular/core';
import {IForgotPassword} from '../../../../api/models/iforgot-password';
import {AccountService} from '../../../../api/account-service.service';
import {BaseComponent} from '../../../../base.component';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  captchaKey:string = environment.googleReCaptchaKey;
  captchaResponse:string = null;
  alertErrorEmail: boolean = false;
  forgotPasswordModel: IForgotPassword = <IForgotPassword>{};


  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {
    super();
  }

  ngOnInit() {
  }

  handleCorrectCaptcha(event:any){
    this.captchaResponse = event;
  }

  sendForgotPassword(isValid) {
    if(this.captchaResponse === null){
      swal({type: 'warning', title: 'Attention!', text: 'You must select the captcha.'});
      return;
    }

    if (isValid) {
      this.forgotPasswordModel.captcha = this.captchaResponse;
      this.busy = this.accountService.forgotPassword(this.forgotPasswordModel)
        .$observable
        .subscribe(
          (result: any) => {
            swal({type: 'success', title: 'Forgot password', text: 'Check your email'}).then(()=> {
              this.router.navigate(['/login']);
            });
            this.busy = null;
          }, (err: any) => {
            swal({type: 'error', title: 'Error', text: err});
            this.busy = null;
          });
    }

  }

}
