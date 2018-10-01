import {Injectable} from '@angular/core';
import {IProjectInformation} from '../../../api/models/iproject-information';
import {IProjectLocation} from '../../../api/models/iproject-location';
import {ProjectInformationService} from '../../../api/project-information.service';
import {Observable} from 'rxjs';
import {IBudget} from '../../../api/models/ibudget';
import {Router} from '@angular/router';
import {Http, RequestOptions, Headers} from '@angular/http';
import {OAuthService} from '../../../oauth/oauth.service';
import {environment} from '../../../../environments/environment';

import {IProjectContact} from '../../../api/models/iproject-contact';
import {ProjectContactService} from '../../../api/project-contact.service';

@Injectable()
export class ProjectSessionService {

  projectInfo: IProjectInformation = <IProjectInformation>{
    projectLocation: <IProjectLocation>{}
  };

  constructor(private projectInfoService: ProjectInformationService,
              private projectContact: ProjectContactService,
              private router: Router,
              private http: Http) {
  }

  save(image: any): Observable<IProjectInformation> {
    if (!this.projectInfo.projectLocation.address1) {
      this.projectInfo.projectLocation = null;
    }

    if (!this.projectInfo.apsd) {
      this.projectInfo.apsd = this.projectInfo.opsd;
    }

    return Observable.create(observer => {
      if (!this.projectInfo.id) {
        this.projectInfoService.new(this.projectInfo).$observable.subscribe((data: IProjectInformation) => {
          this.projectInfo = data;
          swal({type: 'success', title: 'Success', text: 'Save Project Information'}).then(() => {
            this.router.navigate(['build-up', 'project', data.id]);
          });
          observer.next(data);
        }, (error) => {
          swal({type: 'error', title: 'Error', text: error});
          observer.error();
        });
      } else {
        this.projectInfoService.save(this.projectInfo).$observable.subscribe(() => {
          swal({type: 'success', title: 'Success', text: 'Save Project Information'});
          observer.next(this.projectInfo);
        }, (error) => {
          swal({type: 'error', title: 'Error', text: error});
          observer.error();
        });
      }
    });
  }

  private uploadImage(image: any): Observable<any> {
    return Observable.create(observer => {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        const headers = new Headers({});
        headers.append('Authorization', 'Bearer ' + OAuthService.getAccessToken());
        let options = new RequestOptions({headers});
        let url = environment.baseUrl + 'projectinformation/uploadImage/' + this.projectInfo.id;

        this.http.post(url, formData, options).subscribe(res => {
            observer.next();
          },
          () => {
            observer.next();
          });
      } else {
        observer.next();
      }

    });

  }

  get(projectId: number): Observable<IProjectInformation> {
    if (projectId) {
      return Observable.create(observer => {

        this.projectInfoService.get({id: projectId}).$observable.subscribe((data: IProjectInformation) => {

          if (!data.id) {
            this.router.navigate(['not-found']);
            return;
          }

          if (!data.retainedAmount) {
            data.retainedAmount = 0;
          }
          if (data.projectLocation == null) {
            data.projectLocation = <IProjectLocation>{};
          }
          this.projectInfo = data;
          observer.next(this.projectInfo);
        });

      });
    }
  }

  updateRetainedAmount(retainedAmount) {
    this.projectInfoService.updateRatainedAmount({
      projectId: this.projectInfo.id,
      retainedAmount: retainedAmount
    }).$observable.subscribe((data) => {
      //console.log(data);
    });
  }

  updateLastModify(lastModify) {
    this.projectInfoService.updateLastModify({
      projectId: this.projectInfo.id,
      lastModify: lastModify
    }).$observable.subscribe((data) => {
      //console.log(data)
    })
  }


  newProject() {
    this.projectInfo = <IProjectInformation>{
      projectLocation: <IProjectLocation>{}
    };
  }

  saveOrUpdateContact(contact: Array<IProjectContact>){
    if(this.projectInfo.id){
      return Observable.create(observer =>{
        this.projectInfo.lastModify = new Date();
        this.updateLastModify(this.projectInfo.lastModify);
        contact.forEach((value: IProjectContact) =>{
          if(!value.id && contact.length > 0){
            this.projectContact.add(value).$observable.subscribe((result: IProjectContact) =>{
            });
          }else if(value.id && contact.length > 0){
            this.projectContact.save(value).$observable.subscribe((result: IProjectContact) =>{
            });
          }
        });
      });
    }
  }
}
