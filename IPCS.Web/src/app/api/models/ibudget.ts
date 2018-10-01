import { BaseModel } from './ibase-model'
import {ICurrency} from "./icurrency";

export interface IBudget extends BaseModel{

    name: string;
    currencyId: number;
    ammount: number;
    currency:ICurrency;
}
