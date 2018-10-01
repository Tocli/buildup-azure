import { BaseModel } from './ibase-model'
import {IProjectInformation} from './iproject-information';
import {ICurrency} from './icurrency';

export interface IProjectOrder extends BaseModel{
    projectId: number;
    amount: number,
    currencyId: number,
    timeExtension: number,
    userId: number,
    createdAt: Date,
    lastModify: Date,
    dateSubmited: Date,
    description: string,
    projectInformation: IProjectInformation,
    currency: ICurrency,
    acumAmountForTable: number,
    projectNewEndDateForTable: string,
    projectNewContractExpirationDate: string,
    acumTimeExtensionForTable: number,
    projectNewScdForTable: string

}
