import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-can-deactivate-popup',
  templateUrl: './can-deactivate-popup.component.html',
  styleUrls: ['./can-deactivate-popup.component.scss']
})
export class CanDeactivatePopupComponent implements OnInit {

  isShow = 'none';

  @Output()
  response = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  show(){
    this.isShow = 'block';
  }

  hide(){
    this.isShow = 'none';
  }

  sendResponse(responseText){
    this.response.emit(responseText);
  }


}
