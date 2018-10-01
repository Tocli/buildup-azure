import {IProjectActivity} from './iproject-activity';

export interface IProjectCriticalPath extends IProjectActivity {
  activityId: number;
  actualStartDate: Date;
  actualEndDate: Date;
  endTime: Date;
  criticalPathActivityStatus: any;
  criticalPathActiviestOnSchedule: any;
  criticalPathActiviestAheadOfSchedule: any;
  criticalPathActiviestDelayed: any;
  criticalPathActiviestAtRisk: any;
  criticalPathActiviestBlank: any;

}
