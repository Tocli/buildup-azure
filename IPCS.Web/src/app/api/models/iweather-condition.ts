import { BaseModel } from './ibase-model'
import {IProjectActivity} from './iproject-activity';

export interface IWhaterCondition extends BaseModel {
  name: string;
  order: number;
}
