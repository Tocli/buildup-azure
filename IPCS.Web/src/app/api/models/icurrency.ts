import { BaseModel } from './ibase-model';

export interface ICurrency extends BaseModel{    
    name:string;
    symbol:string;
}
