import {IProjectInformation} from './iproject-information';
import {IProjectOrder} from './iproject-order';
import {IProjectCertification} from './iproject-certification';
import {IBudget} from './ibudget';
import {IProjectContact} from './iproject-contact';
import {IProjectActivity} from './iproject-activity';
import {IProjectCriticalPath} from './iproject-critical-path';

export interface IProjectDashBoardResponseModel {
  projectInformation: IProjectInformation;
  projectCertifications: IProjectCertification;
  projectOrder: IProjectOrder;
  budget: IBudget;
  projectContacts: IProjectContact;
  projectActivity: IProjectActivity;
  projectCriticalPath: IProjectCriticalPath;
}


