import {Injectable} from '@angular/core';
import {RestClient} from './rest-client';
import {Resource, ResourceParams, ResourceAction} from 'ngx-resource';
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import {RequestMethod} from '@angular/http';
import {IBudget} from './models/ibudget';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
@ResourceParams({
  url: environment.baseUrl + 'budget'
})
export class BudgetService extends RestClient {

  budgetList: Array<IBudget> = null;

  @ResourceAction({
    isArray: true,
    method: RequestMethod.Get
  })
  list: ResourceMethod<any, IBudget[]>;

  getListBudget(): Observable<IBudget[]> {
    return Observable.create(observer => {
        this.list().$observable.subscribe((data: Array<IBudget>) => {
          this.budgetList = data;
          observer.next(this.budgetList);
        });
    });
  }

  addBudget(budget: IBudget){
    return Observable.create(observer => {
      this.add(budget).$observable.subscribe((data) => {
        this.budgetList.push(data);
        observer.next(data);
      });
    });
  }

  @ResourceAction({
    method: RequestMethod.Put
  })
  add: ResourceMethod<IBudget, any>;

}
