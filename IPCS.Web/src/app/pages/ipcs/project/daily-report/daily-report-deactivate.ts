import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {DailyReportComponent} from './daily-report.component';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {LoginComponent} from '../../../security/login/login.component';
import {OAuthService} from '../../../../oauth/oauth.service';

@Injectable()
export class DailyReportDeactivate implements  CanDeactivate<DailyReportComponent> {

  constructor(private oauthService: OAuthService ){

  }

  canDeactivate(component: DailyReportComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer) => {
      component.dailyReportViewService.isSaved().then((result) => {
        if(nextState.url.indexOf('login') !== -1)
        {
          this.oauthService.clearStorage();
        }
        observer.next(true);
      }, (result) => {
        observer.next(false);
      });
    });

  }

}
