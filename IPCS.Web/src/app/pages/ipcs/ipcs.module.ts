import {NgModule} from '@angular/core';
import {CommonModule, PercentPipe} from '@angular/common';
import {AccordionModule, BsDropdownModule, TooltipModule} from 'ngx-bootstrap';
import {LayoutModule} from '../../layout/layout.module';
import {IpcsRoutingModule} from './ipcs-routing.module';
import {DashboardComponent} from './project/dashboard/dashboard.component';
import {MainComponent} from './main/main.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectComponent} from './project/project.component';
import {InformationComponent} from './project/information/information.component';
import {ParticipantsComponent} from './project/participants/participants.component';
import {ParticipantComponent} from './project/participants/participant/participant.component';
import {DailyReportComponent} from './project/daily-report/daily-report.component';
import {CertificationsComponent} from './project/certifications/certifications.component';
import {ChangeOrderComponent} from './project/change-order/change-order.component';
import {OAuthService} from '../../oauth/oauth.service';
import {CanActivteOAuthGuardService} from '../../oauth/can-activte-oauth-guard.service';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {ResourceModule} from 'ngx-resource';
import {BusyModule} from 'angular2-busy';
import {environment} from '../../../environments/environment';
import {CurrencyService} from '../../api/currency.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {TabsModule} from 'ngx-bootstrap';
import {LocationComponent} from './project/location/location.component';
import {LoadImageComponent} from './project/load-image/load-image.component';
import {BudgetComponent} from './project/budget/budget.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {ImageUploadModule} from 'angular2-image-upload';
import {DatePickerModule} from 'ng2-datepicker';
import {AgmCoreModule, MarkerManager, GoogleMapsAPIWrapper} from '@agm/core';
import {EqualValidator} from '../../directives/validators/equal-validator.directive'
import {EqualValidatorModule} from '../../directives/validators/equal-validator.module';
import {FormattersModule} from '../../directives/formatters/formatters.module';
import {ProjectSessionService} from './project/project-session.service';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {ImageCropperModule} from 'ng2-img-cropper';
import {ApiModule} from '../../api/api.module';
import {OauthModule} from '../../oauth/oauth.module';
import {ActivityTypeComponent} from './project/daily-report/activity-type/activity-type.component';
import {SubType1Component} from './project/daily-report/activity-type/sub-type1/sub-type1.component';
import {SubType2Component} from './project/daily-report/activity-type/sub-type2/sub-type2.component';
import { NewChangeOrderComponent } from './project/change-order/new-change-order/new-change-order.component';
import { CertificationComponent } from './project/certifications/certification/certification.component';
import { RetainedAmountComponent } from './project/certifications/retained-amount/retained-amount.component';
import {SubType3Component} from './project/daily-report/activity-type/sub-type3/sub-type3.component';
import {SubType4Component} from './project/daily-report/activity-type/sub-type4/sub-type4.component';
import {SubType5Component} from './project/daily-report/activity-type/sub-type5/sub-type5.component';
import {DailyReportViewService} from './project/daily-report/daily-report-view.service';
import {Ng2DeviceDetectorModule} from 'ng2-device-detector';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import { TimepickerModule } from 'ngx-bootstrap';
import {DiffDatesPipe} from '../../pipes/diff-dates.pipe';
import {DailyReportDeactivate} from './project/daily-report/daily-report-deactivate';
import { ProjectDetailHeaderComponent } from './project/project-detail-header/project-detail-header.component';
import { CalendarComponent } from './project/dashboard/calendar/calendar.component';
import { PanelIssueComponent } from './project/dashboard/panel-issue/panel-issue.component';
import { InputMaskModule } from 'ng2-inputmask/src/input-mask.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {MainComponentCanLoad} from './main/main-component-can-load';
import { PagesTitleComponent } from './project/pages-title/pages-title.component';
import { ActivityTypePanelFooterComponent } from './project/daily-report/activity-type/activity-type-panel-footer/activity-type-panel-footer.component';
import { CanDeactivatePopupComponent } from './project/daily-report/can-deactivate-popup/can-deactivate-popup.component';

@NgModule({
  imports: [
    CommonModule,
    NgxMyDatePickerModule.forRoot(),
    EqualValidatorModule,
    FormattersModule,
    IpcsRoutingModule,
    LayoutModule,
    ResourceModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BusyModule,
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    ImageUploadModule.forRoot(),
    ImageCropperModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey,
      libraries: ['places']
    }),
    ApiModule,
    OauthModule,
    Ng2DeviceDetectorModule.forRoot(),
    TooltipModule.forRoot(),
    AmChartsModule,
    TimepickerModule.forRoot(),
    InputMaskModule,
    CurrencyMaskModule

  ],
  providers: [CanActivteOAuthGuardService, MainComponentCanLoad, OAuthService, CurrencyService, ProjectSessionService, MarkerManager, GoogleMapsAPIWrapper,
    DailyReportViewService, DailyReportDeactivate],
  declarations: [DiffDatesPipe, DashboardComponent, MainComponent, ProjectsComponent, ProjectComponent, InformationComponent, ParticipantsComponent, ParticipantComponent, DailyReportComponent, CertificationsComponent, ChangeOrderComponent, MyProfileComponent, ChangePasswordComponent, LocationComponent, LoadImageComponent, BudgetComponent, ActivityTypeComponent, SubType1Component, SubType2Component, SubType3Component, SubType4Component, SubType5Component, ProjectDetailHeaderComponent, CalendarComponent, PanelIssueComponent,
  CertificationComponent, RetainedAmountComponent, NewChangeOrderComponent, PagesTitleComponent, ActivityTypePanelFooterComponent, CanDeactivatePopupComponent],
  entryComponents: [LocationComponent, LoadImageComponent, BudgetComponent, ParticipantComponent, NewChangeOrderComponent, CertificationComponent, RetainedAmountComponent,CanDeactivatePopupComponent]
})
export class IpcsModule {
}
