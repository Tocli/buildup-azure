import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './number.directive';
import { CurrencyMaskDirective } from './currency-mask.directive';
import { TimeDurationDirective } from './time-duration.directive';
import { RetainedAmountPercentDirective } from './retained-amount-percent.directive';
import { ProjectCostMoneyMaskDirective } from './project-cost-money-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumberDirective, CurrencyMaskDirective, TimeDurationDirective, RetainedAmountPercentDirective, ProjectCostMoneyMaskDirective],
  exports:[NumberDirective, CurrencyMaskDirective, TimeDurationDirective, RetainedAmountPercentDirective, ProjectCostMoneyMaskDirective]
})
export class FormattersModule { }
