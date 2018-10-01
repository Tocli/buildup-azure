import { Component, OnInit } from '@angular/core';
import { OAuthService } from '../../oauth/oauth.service';


@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor(private oauthService:OAuthService) { }

  ngOnInit() {
  }

  logout(){
    this.oauthService.logout();
  }

}
