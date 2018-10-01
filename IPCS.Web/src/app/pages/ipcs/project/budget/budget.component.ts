import {Component, DebugElement, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { CurrencyService } from '../../../../api/currency.service';
import { ICurrency } from '../../../../api/models/icurrency';
import { IBudget } from '../../../../api/models/ibudget';
import {BaseComponent} from '../../../../base.component';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {BudgetService} from '../../../../api/budget.service';
import {DecimalPipe} from '@angular/common';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent extends  BaseComponent implements  OnInit {

  @Output()
  hide = new EventEmitter();
  currencyListForBudGet: ICurrency[];
  budget:IBudget = <IBudget>{currencyId: 1};
  @ViewChild('formBudget')
  budgetForm:HTMLFormElement;
  @Output()
  save = new EventEmitter();

  constructor(private currencyService: CurrencyService,
              private budgetService: BudgetService) {
    super();
  }

  ngOnInit() {
    this.budget = <IBudget>{currencyId: 1};
    this.currencyService.getListCurrency().subscribe((currencyList) => {
      this.currencyListForBudGet = currencyList;
    });

  }

  setup() {
    this.budgetForm.reset();
    this.budget = <IBudget>{currencyId: 1};
  }

  onClose(){
    this.hide.emit();
  }

  onAutofillSelectedValue(event){
    const decimalPipe = new DecimalPipe('en-US');
    let regex = /[.,\s]/g;
    let value = event.srcElement.value;
    let valueToString = Number( value.replace(/[^0-9\.]+/g,''));
    this.budget.ammount = valueToString;
  }

  onSave(isValid){
    if(isValid){
        this.busy = this.budgetService.addBudget(this.budget).subscribe((data: IBudget) => {
        this.busy = null;
        this.budget = <IBudget>{currencyId: 1};
        this.hide.emit();
        this.save.emit(data.id);
      });
    }
  }


}
