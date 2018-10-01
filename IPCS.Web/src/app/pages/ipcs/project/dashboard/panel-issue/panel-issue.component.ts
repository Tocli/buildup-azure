import {Component, Input, OnInit} from '@angular/core';
import {IProjectActivity} from '../../../../../api/models/iproject-activity';


@Component({
  selector: 'app-panel-issue',
  templateUrl: './panel-issue.component.html',
  styleUrls: ['./panel-issue.component.scss']
})

export class PanelIssueComponent implements OnInit{

  @Input()
  panelColor = 'panel-success';
  @Input()
  issues: IProjectActivity [] = [];
  @Input()
  title: string;
  isCollapsed = true;


  viewAll = false;
  index = 5;
  tempIndex = 5;

  constructor(){
  }

  ngOnInit(){
  }


  viewAllClick() {
    this.viewAll = !this.viewAll;
    if (this.viewAll) {
      this.index = this.issues.length;
    } else {
      this.index = this.tempIndex;
    }
    this.issues = this.issues;
  }
}

