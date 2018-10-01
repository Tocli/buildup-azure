import {Component, OnInit, ViewEncapsulation, enableProdMode} from '@angular/core';
import {OAuthService} from './oauth/oauth.service';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {

  }
}
