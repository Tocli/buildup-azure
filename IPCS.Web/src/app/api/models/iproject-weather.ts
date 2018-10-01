import { BaseModel } from './ibase-model'
import {IProjectActivity} from './iproject-activity';
import {IWhaterCondition} from './iweather-condition';

export interface IProjectWeather extends IProjectActivity {
    conditionId: number;
    startTime: Date;
    endTime: Date;
    weatherCondition: IWhaterCondition;
}
