import { BaseModel } from './ibase-model'
import { ICurrency } from './icurrency'


export interface IProjectCertification extends BaseModel {

    projectId: number;
    date: Date;
    from: Date;
    to: Date;
    grossAmount: number;
    retainedAmount: number;
    currencyId: number;
    currency: ICurrency;
    paid: boolean;
    userId: number;
    createdAt: Date;
    lastModify: Date;
    retained: number;
    netCertifiedAmount: number;
    acumulatedGrossCertifiedAmount: number;
    acumulatedRetainedAmount: number;

}
