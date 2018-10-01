import { BaseModel } from './ibase-model';

export interface IActivityType extends BaseModel {
    name: string;
    description: string;
    order: number;
    column: number;
    class: string;
    subType: number;
}
