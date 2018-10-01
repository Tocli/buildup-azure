import { BaseModel } from './ibase-model'
import {IEntity} from "./ientity";

export interface IProjectContact extends BaseModel {
    projectId: number;
    entityId: number;
    entityDescription: string;
    companyName: string;
    contactPerson: string;
    contractNum: string;
    tel: string;
    email: string;
    entity: IEntity;
}
