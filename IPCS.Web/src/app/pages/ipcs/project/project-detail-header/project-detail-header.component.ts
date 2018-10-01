import {Component, Input, OnInit} from '@angular/core';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {ProjectSessionService} from '../project-session.service';

@Component({
  selector: 'app-project-detail-header',
  templateUrl: './project-detail-header.component.html',
  styleUrls: ['./project-detail-header.component.scss']
})
export class ProjectDetailHeaderComponent implements OnInit {

  @Input()
  projectInformation: IProjectInformation;

  @Input()
  isNew = false;

  @Input()
  sectionName: string;

  constructor(private projectSession: ProjectSessionService) {
  }

  ngOnInit() {
  }

  update() {
    this.projectInformation.lastModify = new Date();
    this.projectSession.updateLastModify(this.projectInformation.lastModify);
  }

}
