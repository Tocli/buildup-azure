import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftComponent } from './left/left.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthService } from '../oauth/oauth.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    BrowserModule
  ],
  providers: [OAuthService],
  declarations: [HeaderComponent, LeftComponent, FooterComponent],
  exports: [HeaderComponent, LeftComponent, FooterComponent]
})
export class LayoutModule { }
