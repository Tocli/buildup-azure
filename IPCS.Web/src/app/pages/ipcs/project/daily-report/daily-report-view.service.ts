import {
  Injectable, NgZone, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Host,
  SkipSelf, ComponentRef
} from '@angular/core';
import {IProjectActivity} from '../../../../api/models/iproject-activity';
import {ProjectDailyReportService} from '../../../../api/project-daily-report.service';
import {IProjectDailyReport} from '../../../../api/models/iproject-daily-report';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ProjectActivityService} from '../../../../api/project-activity.service';
import {ProjectSessionService} from '../project-session.service';
import * as moment from 'moment';
import {findIndex} from 'rxjs/operator/findIndex';
import {SessionStorage} from "ngx-webstorage";
import {CanDeactivatePopupComponent} from "./can-deactivate-popup/can-deactivate-popup.component";


@Injectable()
export class DailyReportViewService implements OnInit {

  @SessionStorage('dailyReportSaved')
  private saved = true;
  private projectId: number;
  dailyReport: IProjectDailyReport;
  private projectActivitySaved: IProjectActivity[] = [];
  date: Date = new Date();
  private subject = new Subject<IProjectActivity[]>();
  busy: any = null;
  nextVisible = false;
  isDraft: any = false;
  draftDate: Date;

  deactivatePopupRef: ComponentRef<CanDeactivatePopupComponent>;
  viewContainerRef: ViewContainerRef;
  constructor(private dailyReportService: ProjectDailyReportService,
              private projectActivityService: ProjectActivityService,
              private projectSession: ProjectSessionService,
              private _ngZone: NgZone,
              private componentFactoryResolver: ComponentFactoryResolver) {
    window['angularComponentRef'] = {component: this, zone: _ngZone};
  }

  ngOnInit() {

  }

  init() {
    this.date = new Date();
    this.saved = true;
    this.projectActivitySaved = [];
    this.subject = new Subject<IProjectActivity[]>();

  }

  showPopupConfirm(){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CanDeactivatePopupComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    this.deactivatePopupRef = containerRef.createComponent(componentFactory);
  }

  findDailyReportByDate(projectId: number) {
    this.projectId = projectId;
    this.busy = this.dailyReportService.findDailyReportByDate(this.projectId, this.date)
      .subscribe((dailyReport: IProjectDailyReport) => {
      this.busy = null;
      this.dailyReport = dailyReport;
        this.subject.next(this.dailyReport.projectActivities);
        let isDraf;
        dailyReport.projectActivities.forEach((value: IProjectActivity ) => {
          if(value.isDraft !== null && value.isDraft !== undefined){
            if(value.isDraft){
              isDraf = value.isDraft;
            }
          }
        });
        if(isDraf){
          this.isDraft = true;
          this.draftDate = dailyReport.projectActivities[0].draftDate;
        }else{
          this.isDraft = false;
        }
      }, () => {
        this.busy = null;
      });
  }

  convertUTCDateToLocalDate(date: Date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  addObserverProjectActivities(): Observable<IProjectActivity[]> {
    return this.subject.asObservable();
  }

  saveOrUpdate() {
    return new Promise<any>((resolve, reject) =>{
      this.projectSession.projectInfo.lastModify = new Date();
      this.projectSession.updateLastModify(this.projectSession.projectInfo.lastModify);
      const dailyReportSave = Object.assign({}, this.dailyReport);
      dailyReportSave.projectActivities = this.projectActivitySaved;
      this.busy = this.dailyReportService.saveOrUpdate(dailyReportSave, this.date, this.projectId)
        .subscribe((result: IProjectDailyReport) => {
          this.busy = null;
          this.dailyReport = result;
          this.saved = true;
          this.subject.next(this.dailyReport.projectActivities);
          this.projectActivitySaved = [];
          this.isDraft = false;
          /*if (swal.isVisible()) {
           swal.clickConfirm();
           }*/
          resolve();

        }, (error) => {
          this.busy = null;
          reject();
        });
    });

  }

  prevDay() {
      this.isSaved().then(() => {
        this.nextVisible = true;
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);
        this.findDailyReportByDate(this.projectId);
      });
  }

  nextDay() {
    this.isSaved().then(() => {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1);
      const now = new Date();
      if (moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).isSame(this.date)) {
        this.nextVisible = false;
      }
      this.findDailyReportByDate(this.projectId);
    });
  }

  addProjectActivity(projectActivity: IProjectActivity) {
    if (!projectActivity.guid) {
      projectActivity.guid = Date.now().toString();
    }
    this.saved = false;
    projectActivity.changed = true;
    const activityFilter = this.findProjectActivityById(this.dailyReport.projectActivities, projectActivity.id, projectActivity.guid);
    if (!activityFilter) {
      this.dailyReport.projectActivities.push(projectActivity);
      this.projectActivitySaved.push(projectActivity);
    } else {
      const paSaved = this.findProjectActivityById(this.projectActivitySaved, projectActivity.id, projectActivity.guid);
      if (paSaved) {
        this.projectActivitySaved[this.projectActivitySaved.indexOf(paSaved)] = projectActivity;
      } else {
        this.projectActivitySaved.push(projectActivity);
      }

      this.dailyReport.projectActivities[this.dailyReport.projectActivities.indexOf(activityFilter)] = projectActivity;
    }
    this.saved = false;
    this.subject.next(this.dailyReport.projectActivities);
  }


  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  private findProjectActivityById(list: IProjectActivity[], id: number, guid: string): IProjectActivity {

    let projectActivities: IProjectActivity[] = list.filter((value: IProjectActivity) => {
      return value.guid === guid;
    });

    if (projectActivities.length === 0) {
      projectActivities = list.filter((value: IProjectActivity) => {
        return value.id && value.id === id;
      });
      if (projectActivities.length === 0) {
        return null;
      }
    }
    return projectActivities[0];
  }


  isSaved(): Promise<any>{
    return new Promise<any>((resolve, reject) =>{
      if(! this.saved){
        this.showPopupConfirm();
        this.deactivatePopupRef.instance.response.subscribe((result) => {

          this.deactivatePopupRef.instance.hide();
          this.deactivatePopupRef.destroy();
          if(result === 'save') {
            this.saveChanges().then(()=>resolve(),()=>resolve());
          } else if(result === 'cancel'){
            this.discartChanges();
            resolve();
          } else {
            reject();
          }

        });
        /*swal({
          type: 'question',
          title: 'Would you like to continue without saving?',
          showCancelButton: false,
          showConfirmButton: false,
          html:
          '<button type="button" onclick="swal.clickCancel();">No</button>' +
          '<button type="button" onclick="swal.clickCancel();">Save</button>' +
          '<button type="button" onclick="swal.clickCancel();">Cancel</button>'
        })
          .then((result) =>{
            if(result){
              this.saveChanges();
              resolve();
            }else{
              reject();
            }
          }, (error) =>{
            reject();
          });*/
      }else{
        resolve();
      }

    });
  }

  //This method save all activities not saved yet
  //if you click the "save button" in the modal.
  saveChanges(){
     return this.saveOrUpdate();

  }

  //This method discart all activities not saved yet
  //if you click the "no button" in the modal.
  discartChanges(){
    this.saved = true;
    this.projectActivitySaved = [];
    //swal.close();
  }

  removeProjectActivity(projectActivity: IProjectActivity) {
    swal({type: 'question', showCancelButton: true, title: 'Delete project activity', text: 'Are you sure you want to delete this actvity?'})
      .then((result) => {
        if (result) {
          if (projectActivity.id) {
            this.busy = this.projectActivityService.delete({id: projectActivity.id}).$observable
              .subscribe((resource) => {
              this.busy = null;
                this.spliceProjectActivity(projectActivity);
              }, (error) => {
                this.busy = null;
              });
          } else {
            this.spliceProjectActivity(projectActivity);
          }

        }
      });
  }

  spliceProjectActivitySaved(projectActivity: IProjectActivity){
    this.projectActivitySaved.splice(this.projectActivitySaved.indexOf(projectActivity), 1);
  }
  spliceProjectActivity(projectActivity: IProjectActivity) {
    const indexSaved = this.projectActivitySaved.indexOf(projectActivity);
    if (indexSaved !== -1) {
      this.projectActivitySaved.splice(indexSaved, 1);
    }
    const index = this.dailyReport.projectActivities.indexOf(projectActivity);
    this.dailyReport.projectActivities.splice(index, 1);
    this.subject.next(this.dailyReport.projectActivities);
  }
}
