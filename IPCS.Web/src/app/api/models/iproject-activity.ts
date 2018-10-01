import { BaseModel } from './ibase-model'
import {IActivityType} from './iactivity-type';


export interface IProjectActivity extends BaseModel {
  reportId: number;
  lastUser: number;
  typeId: number;
  createdAt: Date;
  currentCreatedAt: Date;
  lastModify: Date;
  description: string;
  extraField: string;
  changed: boolean;
  guid: string;
  endDate: Date;
  activityType: IActivityType;
  conditionId: number;
  endTime: Date;
  safetyId: number;
  draftDate: Date;
  isDraft: boolean;
  dailyReportDate: Date;
}
