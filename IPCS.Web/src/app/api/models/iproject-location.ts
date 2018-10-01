import { BaseModel } from './ibase-model';


export interface IProjectLocation extends BaseModel{

    country: string;
    state: string;
    city: string;
    zipCode: string;
    address1: string;
    address2: string;

}
