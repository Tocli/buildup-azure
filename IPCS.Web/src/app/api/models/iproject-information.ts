import {BaseModel} from './ibase-model'
import {IProjectLocation} from './iproject-location';
import {IBudget} from './ibudget';
import {IProjectStatus} from './iproject-status';
import {IProjectOrder} from './iproject-order';
import {IProjectCertification} from './iproject-certification';
import {IProjectDailyReport} from './iproject-daily-report';
import {IProjectContact} from './iproject-contact';

export interface IProjectInformation extends BaseModel {

  projectName: string;
  projectNumber: string;
  locationId: number;
  coordinatesX: number;
  coordinatesY: number;
  scope: string;
  contractDuration: number;
  constructDuration: number;
  npd: Date;
  opsd: Date;
  apsd: Date;
  endDate: Date;
  scd: Date;
  projectLocation: IProjectLocation;
  originalCost: number;
  budGetId: number;
  lastModify: Date;
  image: string;
  projectStatus: IProjectStatus;
  created: Date;
  lastUser: number;
  retainedAmount: number;
  statusId: number;
  budget: IBudget;
  projectOrders: IProjectOrder[];
  projectCertifications: IProjectCertification[];
  projectDailyReports: IProjectDailyReport[];
  projectDailyReport: IProjectDailyReport;
  projectContacts: IProjectContact[];
}
