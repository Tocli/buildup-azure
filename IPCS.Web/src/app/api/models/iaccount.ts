import { BaseModel } from './ibase-model';

export interface IAccount extends BaseModel {
    
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    creationdate: string;
    lastlogin: string;
    lastip: string;
    phonenumber: string;
    reenteremail: string;
    reenterpassword: string;
}