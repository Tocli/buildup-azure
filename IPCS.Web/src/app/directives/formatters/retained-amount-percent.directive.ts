import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appRetainedAmountPercent]'
})
export class RetainedAmountPercentDirective {

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeydownHandler(event:any){
    if(event.key !== "Tab" && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== "ArrowRight"
      && event.key !== "."){
      if (!/[0-9]/i.test(event.key)){
        event.preventDefault();
      }
    }

  }
}
