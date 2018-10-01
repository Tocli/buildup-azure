import { BaseModel } from './ibase-model'
import {IProjectActivity} from './iproject-activity';
import {IProjectCriticalPath} from './iproject-critical-path';
import {IProjectWeather} from './iproject-weather';
import {IProjectSafety} from './iproject-safety';

export interface IProjectDailyReport extends BaseModel {

    projectId: number;
    date: Date;
    projectActivities: any[];
    projectCriticalPaths: IProjectCriticalPath[];
    projectWeathers: IProjectWeather[];
    projectSafetys: IProjectSafety[];
}
