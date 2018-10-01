import {Injectable} from '@angular/core';
import {CanLoad, Route} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SafetyIssueService} from '../../../api/safety-issue.service';
import {WeatherConditionService} from '../../../api/weather-condition.service';
import {CurrencyService} from '../../../api/currency.service';

@Injectable()
export class MainComponentCanLoad implements CanLoad {
  constructor(private safetyIssueService: SafetyIssueService,
              private weatherConditionsService: WeatherConditionService,
              private currencyService: CurrencyService) {
  }
  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    this.safetyIssueService.listAll().subscribe();
    this.weatherConditionsService.listAll().subscribe();
    this.currencyService.getListCurrency().subscribe();
    return true;
  }
}
