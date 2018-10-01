import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-type-panel-footer',
  templateUrl: './activity-type-panel-footer.component.html',
  styleUrls: ['./activity-type-panel-footer.component.scss']
})
export class ActivityTypePanelFooterComponent implements OnInit {

  @Input()
  footerDescription

  constructor() { }

  ngOnInit() {
  }

}
