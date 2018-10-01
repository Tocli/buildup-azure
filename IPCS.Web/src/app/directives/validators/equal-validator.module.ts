/**
 * Created by Juan Pablo Ortiz on 1/8/2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidator } from './equal-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EqualValidator],
  exports: [EqualValidator]
})
export class EqualValidatorModule { }
