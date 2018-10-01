import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appTimeDuration]'
})
export class TimeDurationDirective {

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @Input() OnlyNumber: boolean;

  @HostListener('keydown', ['$event'])
  onKeydownHandler(event:any){
    if(event.key !== "Tab" && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== "ArrowRight"){
      if (!/^[0-9]+$/i.test(event.key)){
        event.preventDefault();
      }
    }

  }
}
