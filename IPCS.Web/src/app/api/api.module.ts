import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResourceModule} from 'ngx-resource';
import {BudgetService} from './budget.service';
import {CurrencyService} from './currency.service';
import {ProjectActivityService} from './project-activity.service';
import {TestServiceService} from './test-service.service';
import {ActivityTypeService} from './activity-type.service';
import {EntityService} from './entity.service';
import {ProjectCertificationService} from './project-certification.service';
import {ProjectContactService} from './project-contact.service';
import {ProjectDailyReportService} from './project-daily-report.service';
import {ProjectInformationService} from './project-information.service';
import {ProjectLocationService} from './project-location.service';
import {ProjectOrderService} from './project-order.service';
import {ProjectPropertyService} from './project-property.service';
import {ProjectStatusService} from './project-status.service';
import {ProjectWeatherService} from './project-weather.service';
import {AccountService} from './account-service.service';
import {OAuthService} from '../oauth/oauth.service';
import {LocationDataService} from './location-data.service';
import {SafetyIssueService} from './safety-issue.service';
import {WeatherConditionService} from "./weather-condition.service";

@NgModule({
  imports: [
    CommonModule,
    ResourceModule.forRoot()
  ],
  declarations: [],
  providers: [SafetyIssueService, OAuthService, CurrencyService, BudgetService,
    ProjectActivityService, ActivityTypeService, EntityService, ProjectCertificationService,
    ProjectContactService, ProjectContactService, ProjectDailyReportService, ProjectInformationService,
    ProjectLocationService, ProjectOrderService, ProjectOrderService, ProjectPropertyService, ProjectStatusService,
    ProjectWeatherService, TestServiceService, AccountService, AccountService, LocationDataService, WeatherConditionService],
  exports: []
})
export class ApiModule {
}
