import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResourceAction, ResourceParams, Resource } from 'ngx-resource';
import { RequestMethod } from '@angular/http';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { IAccount } from './models/iaccount';
import { IForgotPassword } from './models/iforgot-password';
import { RestClient } from './rest-client';
import { IResetPassword } from './models/ireset-password';
import { IReactivateAccount } from './models/ireactivate-account';
import { IChangeMyData } from './models/ichange-my-data';
import { IProfileInformation } from './models/iprofile-information';
import { IChangePassword } from './models/ichange-password';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'account'
})
export class AccountService extends RestClient {


    @ResourceAction({
        method: RequestMethod.Post,
        path: '/register'
    })
    save: ResourceMethod<IAccount, any>;

    @ResourceAction({
      method: RequestMethod.Post,
      path: '/forgotpassword'
    })
    forgotPassword: ResourceMethod<IForgotPassword, any>;

    @ResourceAction({
      method: RequestMethod.Get,
      path: '/forgotpassword/valid/{!guid}'
    })
    validForgotPassword: ResourceMethod<{ guid: string }, any>;

    @ResourceAction({
        method: RequestMethod.Post,
        path: '/resetPassword'
    })
    resetPassword: ResourceMethod<IResetPassword, any>;

    @ResourceAction({
      method: RequestMethod.Post,
      path: '/changepassword'
    })
    changePassword: ResourceMethod<IChangePassword, any>;

    @ResourceAction({
        method: RequestMethod.Post,
        path: '/reactivateaccount'
    })
    reactivateAccount: ResourceMethod<IReactivateAccount, any>;

    @ResourceAction({
      path: '/activate-account/{!guid}'
    })
    activateAccount: ResourceMethod<{guid:string}, any>;

    @ResourceAction({
        path: '/userprofile'
    })
    getUserProfile: ResourceMethod<any, IProfileInformation>;

    @ResourceAction({
        method: RequestMethod.Post,
        path: '/savemyprofile'
    })
    changeMyData: ResourceMethod<IChangeMyData, any>;

}
