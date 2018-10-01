import { IPaginatorRequestModel } from './ipaginator-request-model';
export interface IProjectInformationRequestModel extends IPaginatorRequestModel{
  valueFilter:string;
  status: number;
}
