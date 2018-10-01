import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security/security-routing.module';
import { SecurityModule } from './security/security.module';
import { IpcsRoutingModule } from './ipcs/ipcs-routing.module';
import { IpcsModule } from './ipcs/ipcs.module';
import { PrivacyAndTermsComponent } from './privacy-and-terms/privacy-and-terms.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SecurityModule,
    IpcsRoutingModule,
    IpcsModule
  ],
  declarations: []
})
export class PagesModule { }
