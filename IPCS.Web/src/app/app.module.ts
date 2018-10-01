import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LayoutModule} from './layout/layout.module';
import {PagesModule} from './pages/pages.module';
import {Routes, RouterModule} from '@angular/router';
import {Ng2Webstorage} from 'ngx-webstorage';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ResourceModule} from 'ngx-resource';
import {OAuthService} from './oauth/oauth.service';
import {CookieModule} from 'ngx-cookie';
import {ApiModule} from './api/api.module';
import {OauthModule} from './oauth/oauth.module';


const routes: Routes = [
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    PagesModule,
    RouterModule.forRoot(routes),
    Ng2Webstorage,
    ResourceModule.forRoot(),
    CookieModule.forRoot(),
    ApiModule,
    OauthModule
  ],
  exports: [RouterModule],
  providers: [OAuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
