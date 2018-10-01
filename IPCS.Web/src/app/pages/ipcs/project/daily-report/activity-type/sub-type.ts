import {IProjectActivity} from '../../../../../api/models/iproject-activity';
import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IActivityType} from '../../../../../api/models/iactivity-type';
import {FormGroup, NgForm} from '@angular/forms';
import {DatePipe} from '@angular/common';

export class SubType {

  @Output()
  public hide = new EventEmitter();
  @Output()
  public saveProjectActivity: EventEmitter<IProjectActivity> = new EventEmitter<IProjectActivity>();
  @Input()
  public at: IActivityType;
  proyectActivity: IProjectActivity = <IProjectActivity>{};
  dateModel: any = null;
  @ViewChild('subTypeForm')
  subTypeForm: NgForm;

  setProjectActivity(projectActivity: IProjectActivity) {
    this.proyectActivity = Object.assign({}, projectActivity, { createdAt: projectActivity.currentCreatedAt});
    if (this.proyectActivity.createdAt) {
      this.proyectActivity.createdAt = new Date();
      this.dateModel = {
        date: {
          month: this.proyectActivity.createdAt.getMonth() + 1,
          day: this.proyectActivity.createdAt.getDate(),
          year: this.proyectActivity.createdAt.getFullYear()
        }
      };
    }
  }

  setProjectActivityWeatherIssues(projectActivity: IProjectActivity) {
    this.proyectActivity = Object.assign({}, projectActivity, { createdAt: projectActivity.currentCreatedAt});
    if (this.proyectActivity.createdAt) {
      this.proyectActivity.createdAt = new Date(this.proyectActivity.createdAt);
      this.dateModel = {
        date: {
          month: this.proyectActivity.createdAt.getMonth() + 1,
          day: this.proyectActivity.createdAt.getDate(),
          year: this.proyectActivity.createdAt.getFullYear()
        }
      };
    }
  }

  setProjectActivityCriticalPathIssues(projectActivity: IProjectActivity) {
      //this.proyectActivity = Object.assign({}, projectActivity, { createdAt: projectActivity.currentCreatedAt});
      this.proyectActivity = Object.assign({}, projectActivity, { createdAt: projectActivity.createdAt});
    if (this.proyectActivity.createdAt) {
      this.proyectActivity.createdAt = new Date(this.proyectActivity.createdAt);
      this.dateModel = {
        date: {
          month: this.proyectActivity.createdAt.getMonth() + 1,
          day: this.proyectActivity.createdAt.getDate(),
          year: this.proyectActivity.createdAt.getFullYear()
        }
      };
    }
  }

  save(form: any) {
    if (form.valid) {
      this.proyectActivity.typeId = this.at.id;
      this.saveProjectActivity.emit(this.proyectActivity);
      this.reset();
    }

  }

  reset() {
    this.hide.emit();
    this.dateModel = null;
    this.proyectActivity = <IProjectActivity>{};
    this.subTypeForm.resetForm();
  }

  cancel() {
    this.proyectActivity.createdAt = this.proyectActivity.currentCreatedAt;
    this.hide.emit();
    this.dateModel = null;
    this.proyectActivity = <IProjectActivity>{};
    this.subTypeForm.resetForm();
  }

  dateChanged(date) {
    this.proyectActivity.createdAt = date.jsdate;
    this.changeDates();
  }

  changeDates() {}


}
