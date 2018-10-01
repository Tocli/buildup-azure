import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../../app/base.component';
import {ProjectSessionService} from './project-session.service';
import {ActivatedRoute} from '@angular/router';
import {InformationComponent} from './information/information.component';
import {Ng2DeviceService} from 'ng2-device-detector';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent extends BaseComponent implements OnInit {

  @ViewChild('information')
  public information: InformationComponent;

  isNew: any;
  isDesktop = true;

  constructor(public projectSession: ProjectSessionService,
              private route: ActivatedRoute,
              private deviceService: Ng2DeviceService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if(params.projectId == null || params.projectId == undefined){
        this.isNew = true;
      }else{
        this.isNew = false;
      }
    });
    this.isDesktop = this.deviceService.isDesktop();
  }
}
