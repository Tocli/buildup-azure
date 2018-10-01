import {Component, OnInit} from '@angular/core';
import {IChangeMyData} from '../../../api/models/ichange-my-data';
import {AccountService} from '../../../api/account-service.service';
import {OAuthService} from '../../../oauth/oauth.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../../base.component';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends BaseComponent implements OnInit {

  changeMyDataModel: IChangeMyData = <IChangeMyData>{};
  profileInformation: any;

  constructor(private accountService: AccountService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    jQuery('.phone').intlTelInput();
    this.profileInformation = OAuthService.getUserProfile()
    this.changeMyDataModel.firstName = this.profileInformation.firstName;
    this.changeMyDataModel.lastName = this.profileInformation.lastName;
    this.changeMyDataModel.phoneNumber = this.profileInformation.phoneNumber;
    jQuery('.phone').intlTelInput('setNumber', this.profileInformation.phoneNumber);
  }

  sendChangeMyData(isValid) {
    if (isValid) {
      this.changeMyDataModel.phoneNumber = jQuery('.phone').intlTelInput('getNumber');
      this.busy = this.accountService.changeMyData(this.changeMyDataModel)
        .$observable
        .subscribe(
          (result: any) => {
            const userProfile = OAuthService.getUserProfile();
            userProfile.firstName = this.changeMyDataModel.firstName;
            userProfile.lastName = this.changeMyDataModel.lastName;
            userProfile.phoneNumber = this.changeMyDataModel.phoneNumber;
            OAuthService.saveUserProfile(userProfile);
            this.busy = null;
            swal({type: 'success', title: 'Change My Data', text: 'Success'});
          }, (err: any) => {
            this.busy = null;
            swal({type: 'error', title: 'Error'});
          });
    }

  }

}
