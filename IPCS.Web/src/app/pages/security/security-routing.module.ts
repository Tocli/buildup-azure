import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CanActivteService } from '../../oauth/can-activte.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactivateAccountComponent } from './reactivate-account/reactivate-account.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';




const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate : [CanActivteService] },
    { path: 'signup', component: SignUpComponent, canActivate : [CanActivteService] },
    { path: 'reactivate-account', component: ReactivateAccountComponent, canActivate: [CanActivteService] },
    { path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [CanActivteService] },
    { path: 'resetPassword/:guid', component: SetNewPasswordComponent, canActivate: [CanActivteService] },
    { path: 'account-activate/:guid', component: ActivateAccountComponent, canActivate: [CanActivteService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
