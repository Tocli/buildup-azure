import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectDailyReport } from './models/iproject-daily-report';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {IProjectActivity} from './models/iproject-activity';
import {DatePipe} from '@angular/common';

interface GetDailyReportByDateRequestModel {
  projectId: number;
  date: Date;
}

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectdailyreport'
})
export class ProjectDailyReportService extends RestClient {

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IProjectDailyReport[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IProjectDailyReport>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectDailyReport, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectDailyReport, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

    @ResourceAction({
      isArray: true,
      path: '/getSafetySemaphoreStatus/{!id}'
    })
    getSafetySemaphoreStatus: ResourceMethod<{ id: any }, any>;

    @ResourceAction({
      method: RequestMethod.Post,
      path: '/getbydate'
    })
      getbydate: ResourceMethod<GetDailyReportByDateRequestModel, IProjectDailyReport>;

    findDailyReportByDate(projectId: number, date: Date): Observable<IProjectDailyReport> {
      return Observable.create((observer) => {
        this.getbydate(<GetDailyReportByDateRequestModel>{ projectId: projectId, date: date}).$observable.
          subscribe((dailyReport: IProjectDailyReport) => {
          dailyReport.date = new Date(dailyReport.date);
          observer.next(dailyReport);
        });
      });
    }

    saveOrUpdate(dailyReport: IProjectDailyReport, date: Date, projectId: number): Observable<IProjectDailyReport> {
      return Observable.create((observer) => {
        const datePipe = new DatePipe('en-US');
        if (dailyReport.id === 0) {
          dailyReport.date =  date;
          dailyReport.projectId = projectId;
          this.add(dailyReport).$observable.subscribe((result: IProjectDailyReport) => {
            result.date = new Date(result.date);
            observer.next(result);
          }, (error) => {
            observer.error(error);
          });
        } else {
          this.save(dailyReport).$observable.subscribe((result: IProjectDailyReport) => {
            result.date = new Date(result.date);
            observer.next(result);
          }, (error) => {
            observer.error(error);
          });
        }
      });
    }

}
