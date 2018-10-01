import {Component, OnInit, Input} from '@angular/core';
import {OAuthService, IUserProfile} from '../../../oauth/oauth.service';
import { BaseComponent } from '../../../base.component';
import { NgForm } from '@angular/forms';
import {AccountService} from "../../../api/account-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  model:any = {email : '',password:''};

  heroState:string = 'active';

  errorLogin:boolean = false;

  rememberMe:boolean = false;

  errorDescription:string = '';

  reactivateAccount:boolean = false;

  constructor(private oauthService: OAuthService,private accountService:AccountService,private router:Router) {
    super();
    this.rememberMe = oauthService.isRememberMe();
    this.model.email = oauthService.emailRemember();
  }

  ngOnInit() {
  }
  login(isValid:boolean){
    if(isValid && this.model.password.length > 0){
      this.errorLogin = false;
      this.busy = this.oauthService.login(this.model.email,this.model.password,this.rememberMe).subscribe(ok=>{
        this.accountService.getUserProfile().$observable.subscribe((dataUser: IUserProfile) => {
          OAuthService.userProfile = <IUserProfile>(dataUser);
          this.router.navigate(['/']);
        });

      },error => {
        this.errorLogin = true;
        console.log(error);
        if(error.error === 'not_confirmed'){
          this.reactivateAccount = true;
        }
        this.errorDescription = error.error_description;
      });
    }

  }


}
