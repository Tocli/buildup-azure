import {Component, OnInit, TemplateRef, ViewChild, ElementRef, NgZone} from '@angular/core';
import {ProjectInformationService} from '../../../api/project-information.service';
import {IProjectInformation} from '../../../api/models/iproject-information';
import {IProjectInformationRequestModel} from '../../../api/models/iproject-information-request-model';
import {IPaginatorResponseModel} from '../../../api/models/ipaginator-response-model';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BaseComponent} from '../../../base.component';
import {AgmMap, MapsAPILoader} from '@agm/core';
import {MapTypeControlStyle, MapTypeControlOptions, ControlPosition} from '@agm/core/services/google-maps-types';
import {Router} from '@angular/router';
import {ProjectSessionService} from '../project/project-session.service';
import {FormControl} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {WeatherConditionService} from '../../../api/weather-condition.service';
import {SafetyIssueService} from '../../../api/safety-issue.service';
import {IWhaterCondition} from '../../../api/models/iweather-condition';
import {ISafetyIssue} from '../../../api/models/isafety-issue';
import {IProjectStatus} from '../../../api/models/iproject-status';
import {ProjectStatusService} from '../../../api/project-status.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import swal from 'sweetalert2'
import {Ng2DeviceService} from 'ng2-device-detector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
  /*animations: [
    trigger('showHideProjects', [
      state('show', style({
        left: '0px'
      })),
      state('hide', style({
        left: '-765px'
      })),
      transition('show => hide', animate('250ms ease-in')),
      transition('hide => show', animate('250ms ease-out'))
    ]),
    trigger('showHideMap', [
      state('show', style({
        width: '40%'
      })),
      state('hide', style({
        width: '100%'
      })),
      transition('show => hide', animate('250ms ease-in')),
      transition('hide => show', animate('250ms ease-out'))
    ])
  ]*/
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  private environment: any = environment;
  @ViewChild(AgmMap)
  agm: any;
  public searchControl: FormControl;
  @ViewChild('searchMap')
  public searchElementRef: ElementRef;
  modalRef: BsModalRef;
  projects: Array<IProjectInformation> = new Array<IProjectInformation>();
  totalRows = 0;
  projectsViewState = 'show';
  pages: Array<number> = new Array<number>();
  currentRow = 0;
  currentLastRow = 1;
  googleMapData: any = {
    lat: 18.2500000,
    lng: -66.5000000
  };
  zoom = 2;
  paginatorRequestModel: IProjectInformationRequestModel = <IProjectInformationRequestModel>{
    rowsPage: 10,
    page: 0,
    valueFilter: null,
    desc: false
  };
  random: string = Math.random().toString();
  outSwal = false;
  statuses: IProjectStatus[] = [];
  currentStatus = 1;
  columnOrder = 'ProjectName';
  searchTerm: string;
  searchString: any;
  @ViewChild('searchProjects')
  inputSearchProjects: ElementRef;
  isIos = false;
  constructor(private projectInformationService: ProjectInformationService,
              private modalService: BsModalService,
              private projectSession: ProjectSessionService,
              private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private safetyIssueService: SafetyIssueService,
              private weatherConditionService: WeatherConditionService,
              private statusService: ProjectStatusService,
              private deviceService: Ng2DeviceService) {
    super();
    this.isIos = this.deviceService.os === 'iOS';

  }

  ngOnInit() {

    jQuery('#projects-lists').slideReveal({
      trigger: jQuery('#collapser'),
      width: jQuery('auto'),
      speed: 500,
      autoEscape: false,
      shown: () => {
        this.agm.triggerResize();
      },
      hidden: () => {
        this.agm.triggerResize();
      }
    });
    jQuery('#projects-lists').slideReveal('show');

    this.weatherConditionService.listAll().subscribe((result: IWhaterCondition[]) => {
    });
    this.safetyIssueService.listAll().subscribe((result: ISafetyIssue[]) => {
    });
    this.searchControl = new FormControl();
    this.setupMap();
    this.getProjects();
    this.agm.panControl = true;
    this.agm.mapTypeControl = true;
    this.agm.rotateControl = true;
    this.agm.streetViewControl = false;
    this.agm.mapTypeControlOptions = <MapTypeControlOptions>{
      style: MapTypeControlStyle.DEFAULT,
      position: ControlPosition.LEFT_BOTTOM
    };
    this.statusService.list().subscribe((statuses: IProjectStatus[]) => {
      this.statuses = statuses;
    });

    const inputBox = this.inputSearchProjects.nativeElement;
    const source = Observable.fromEvent(inputBox, 'keyup')
      .map((x: any) => {
        return x.currentTarget.value;
      })
      .debounce((x: any) => {
        return Observable.timer(500);
      });


    source.subscribe(
      (x) => {
        this.paginatorRequestModel.valueFilter = this.searchString;
        this.getProjects();
      });


  }

  setupMap() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.zoom = 12;
          this.googleMapData.lng = place.geometry.location.lng();
          this.googleMapData.lat = place.geometry.location.lat();
        });
      });
    });

  }

  onDoneMapAnimation() {
    this.agm.triggerResize();
  }

  search() {
    this.getProjects();
  }

  onSearchChange() {
    console.log(this.searchString);
    this.paginatorRequestModel.valueFilter = this.searchString;
    this.getProjects();
  }

  getProjects() {
    this.paginatorRequestModel.status = this.currentStatus;
    this.busy = this.projectInformationService.list(this.paginatorRequestModel).$observable.subscribe((paginator: IPaginatorResponseModel) => {
        this.busy = null;
        this.pages = new Array<number>();
        this.totalRows = paginator.totalRows;
        this.projects = <Array<IProjectInformation>>paginator.resultList;
        const pageCount = Math.ceil(this.totalRows / this.paginatorRequestModel.rowsPage);
        for (let i = 0; i < pageCount; i++) {
          this.pages.push(i);
        }
        if (this.totalRows === 0) {
          this.currentRow = 0;
        } else {
          this.currentRow = (this.paginatorRequestModel.page * this.paginatorRequestModel.rowsPage) + 1;
        }
        if (((this.paginatorRequestModel.page * this.paginatorRequestModel.rowsPage) + this.projects.length) === this.totalRows) {
          this.currentLastRow = this.totalRows;
        } else {
          this.currentLastRow = (this.paginatorRequestModel.page + 1) * this.paginatorRequestModel.rowsPage;
        }
      },
      () => {
        this.busy = null;
      });
  }

  public openModalSearch(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public hideModalSearch() {
    this.modalRef.hide();
  }

  changePage(page: number) {
    this.paginatorRequestModel.page = page;
    this.getProjects();
  }

  deleteProject(projectId) {

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Project',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.projectInformationService.deleteProjects({id: projectId}).$observable.subscribe(() => {
        this.getProjects();
      });

    });

  }

  nextPage() {
    if (this.paginatorRequestModel.page < this.pages.length - 1) {
      this.paginatorRequestModel.page += 1;
      this.getProjects();
    }
  }

  prevPage() {
    if (this.paginatorRequestModel.page > 0) {
      this.paginatorRequestModel.page -= 1;
      this.getProjects();
    }
  }

  hideShowProjectsPanel() {
    if (this.projectsViewState === 'show') {
      this.projectsViewState = 'hide';
    } else {
      this.projectsViewState = 'show';
    }
    jQuery('#projects-map').toggleClass('fulled');
    jQuery('.collapser').toggleClass('rotated');
    this.agm.triggerResize();

  }

  parseFloat(coord) {
    return parseFloat(coord);
  }

  loadDefaultImage(img: HTMLImageElement) {
    img.src = '/img/dafault_project_image.PNG';
  }

  orderBy(property: string) {
    this.columnOrder = property;
    this.paginatorRequestModel.orderProperty = property;
    this.paginatorRequestModel.desc = !this.paginatorRequestModel.desc;
    this.getProjects();
  }

  centerMapProyect(project: IProjectInformation) {
    if (project.coordinatesX && project.coordinatesY) {
      this.googleMapData.lat = parseFloat(project.coordinatesY.toString());
      this.googleMapData.lng = parseFloat(project.coordinatesX.toString());
      this.zoom = 12;
    }


  }

  changeStatus() {
    this.getProjects();
  }
}
