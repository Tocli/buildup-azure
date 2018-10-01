import {Component, OnInit} from '@angular/core';
import {IUserProfile, OAuthService} from '../../oauth/oauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;

  firsName: string;

  lastName: string;

  constructor(private oauthService: OAuthService) {
  }

  isIn = false;   // store state
  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  ngOnInit() {
    this.isLogin = this.oauthService.isLoggedIn();
    this.oauthService.getStatusObservable().subscribe((status) => {
      this.isLogin = status;
    });
    this.changUserProfile();
    OAuthService.addObserverProfile().subscribe((profile: IUserProfile) => {
      this.changUserProfile();
    });
  }

  changUserProfile() {
    this.firsName = OAuthService.getUserProfile().firstName;
    this.lastName = OAuthService.getUserProfile().lastName;
  }

  logout() {
    this.oauthService.logout();
  }


}
