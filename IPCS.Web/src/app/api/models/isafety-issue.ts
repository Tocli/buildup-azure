import {BaseModel} from './ibase-model';

export interface ISafetyIssue extends BaseModel {
  name: string;
  order: number;
}
