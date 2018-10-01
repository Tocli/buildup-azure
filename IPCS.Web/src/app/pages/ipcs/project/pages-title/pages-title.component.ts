import { Component, Input, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';

@Component({
  selector: 'app-pages-title',
  templateUrl: './pages-title.component.html',
  styleUrls: ['./pages-title.component.scss']
})
export class PagesTitleComponent implements OnInit {

  @Input()
  pageTitle: any;

  constructor() { }

  ngOnInit() {
   }
}
