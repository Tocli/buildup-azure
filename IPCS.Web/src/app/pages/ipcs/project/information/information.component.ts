import {
  Component, OnInit, ViewChild, ElementRef, NgZone
} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {LocationComponent} from '../location/location.component';
import {BudgetComponent} from '../budget/budget.component';
import {CurrencyService} from '../../../../api/currency.service';
import {ICurrency} from '../../../../api/models/icurrency';
import {BaseComponent} from '../../../../base.component';
import {BudgetService} from '../../../../../../src/app/api/budget.service';
import {IBudget} from '../../../../api/models/ibudget';
import {ProjectSessionService} from '../project-session.service';
import {AgmMap, MapsAPILoader} from '@agm/core';
import {DatePickerOptions} from 'ng2-datepicker/lib-dist/ng2-datepicker.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from '@types/googlemaps';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap';
import {environment} from '../../../../../environments/environment';
import {Header} from 'angular2-image-upload/lib/image.service';
import {OAuthService} from '../../../../oauth/oauth.service';
import {ImageUploadComponent} from 'angular2-image-upload/lib/image-upload/image-upload.component';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {ParticipantsComponent} from '../participants/participants.component';
import {IProjectStatus} from '../../../../api/models/iproject-status';
import {ProjectStatusService} from '../../../../api/project-status.service';
import {DecimalPipe} from '@angular/common';


interface IMarker {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent extends BaseComponent implements OnInit {

  statuses: IProjectStatus[];
  @ViewChild('projectForm')
  projectForm: HTMLFormElement;
  private imageUploadFile: any;
  @ViewChild('projectImage')
  private projectImage: ElementRef;
  public zoom = 8;
  public searchControl: FormControl;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild(AgmMap)
  agm: any;
  @ViewChild('modalCoordinates')
  public modalCoordinates: ModalDirective;
  @ViewChild('modalImage')
  public modalImage: ModalDirective;
  @ViewChild('modalBudget')
  modalBudget: ModalDirective;
  @ViewChild('modalLocation')
  modalLocation: ModalDirective;
  @ViewChild('location')
  location: LocationComponent;
  @ViewChild('imageUpload')
  public imageUpload: ImageUploadComponent;
  currencyList: ICurrency[];
  budgetList: IBudget[];
  marker: IMarker = <IMarker>{};
  options: DatePickerOptions;
  googleMapData: any = {
    lat: 18.2500000,
    lng: -66.5000000
  }
  npdModel: any;
  opsModel: any;
  apsModel: any;
  projectEndModel: any;
  scModel: any;
  projectCoordinates: any;
  currentStatus = '';
  statusesAvailables: IProjectStatus[];

  dataImage: any;
  cropperSettings: CropperSettings;
  selectedValue: any;

  public dateTimePickerOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  constructor(private modalService: BsModalService,
              private currencyService: CurrencyService,
              private BudgetService: BudgetService,
              public projectSession: ProjectSessionService,
              private route: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              public router: Router,
              private projectStatusService: ProjectStatusService) {
    super();
    this.options = new DatePickerOptions();
    this.searchControl = new FormControl();

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 76;
    this.cropperSettings.height = 66;
    this.cropperSettings.keepAspect = true;
    //this.cropperSettings.minWithRelativeToResolution = true;
    this.cropperSettings.croppedWidth = 76;
    this.cropperSettings.croppedHeight = 66;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.dataImage = {};
  }

  ngOnInit() {

    this.projectStatusService.list().subscribe((result: IProjectStatus[]) => {
      this.statuses = result;
      this.setupMap();
      this.setupData();
      if (this.route.params) {
        this.route.params.subscribe((params) => {
          const projectId = params.projectId;
          if (projectId) {
            this.busy = this.projectSession.get(projectId).subscribe((data) => {
              this.busy = null;
              this.setupStatus();
              this.setupDates();
              this.loadImage();
              this.setupProjectCoordinates();
            });
          } else {
            this.projectSession.newProject();
            this.setupDates();
            this.currentStatus = 'On-Going';
          }
        });
      } else {
        this.currentStatus = 'On-Going';
      }
    });


  }

  onAutofillSelectedValue(event){
    const decimalPipe = new DecimalPipe('en-US');
    let regex = /[.,\s]/g;
    let value = event.srcElement.value;
    let valueToString = Number( value.replace(/[^0-9\.]+/g,''));
    this.projectSession.projectInfo.originalCost = valueToString;
  }

  setupStatus() {
    this.statusesAvailables = this.statuses.filter((value: IProjectStatus) => {
      return value.id !== this.projectSession.projectInfo.statusId;
    });
    this.currentStatus = this.statuses.find((value: IProjectStatus) => {
      return value.id === this.projectSession.projectInfo.statusId;
    }).name;
  }

  loadImage() {
    this.projectImage.nativeElement.src = environment.baseProjectImageUrl + this.projectSession.projectInfo.id + '.png?nocache=' + Math.random();
  }

  budgetSaved(budgetId){
    this.projectSession.projectInfo.budGetId = budgetId;
  }

  setupData() {
    this.currencyService.getListCurrency().subscribe((currencyList) => {
      this.currencyList = currencyList;

    });
    this.BudgetService.getListBudget().subscribe((budgetList) => {
      this.budgetList = budgetList;
    });
  }

  handlerShownMap() {
    this.agm.triggerResize().then(() => {
      this.agm._mapsWrapper.setCenter(this.googleMapData);
    });

  }

  setupProjectCoordinates() {
    if (this.projectSession.projectInfo.coordinatesX != null && this.projectSession.projectInfo.coordinatesY != null) {
      this.projectCoordinates = ('(' + this.projectSession.projectInfo.coordinatesY + ';' + this.projectSession.projectInfo.coordinatesX + ')');
    }
  }

  setupDates() {
    this.projectSession.projectInfo.npd = this.isValidDate(this.projectSession.projectInfo.npd);
    if (this.projectSession.projectInfo.npd) {
      this.npdModel = {
        date: {
          year: this.projectSession.projectInfo.npd.getFullYear(),
          month: this.projectSession.projectInfo.npd.getMonth() + 1,
          day: this.projectSession.projectInfo.npd.getDate()
        }
      };
    }
    this.projectSession.projectInfo.opsd = this.isValidDate(this.projectSession.projectInfo.opsd);
    if (this.projectSession.projectInfo.opsd) {
      this.opsModel = {
        date: {
          year: this.projectSession.projectInfo.opsd.getFullYear(),
          month: this.projectSession.projectInfo.opsd.getMonth() + 1,
          day: this.projectSession.projectInfo.opsd.getDate()
        }
      };
    }
    this.projectSession.projectInfo.apsd = this.isValidDate(this.projectSession.projectInfo.apsd);
    if (this.projectSession.projectInfo.apsd) {
      this.apsModel = {
        date: {
          year: this.projectSession.projectInfo.apsd.getFullYear(),
          month: this.projectSession.projectInfo.apsd.getMonth() + 1,
          day: this.projectSession.projectInfo.apsd.getDate()
        }
      };
    }
    this.projectSession.projectInfo.endDate = this.isValidDate(this.projectSession.projectInfo.endDate);
    if (this.projectSession.projectInfo.endDate) {
      this.projectEndModel = {
        date: {
          year: this.projectSession.projectInfo.endDate.getFullYear(),
          month: this.projectSession.projectInfo.endDate.getMonth() + 1,
          day: this.projectSession.projectInfo.endDate.getDate()
        }
      };
    }
    this.projectSession.projectInfo.scd = this.isValidDate(this.projectSession.projectInfo.scd);
    if (this.projectSession.projectInfo.scd) {
      this.scModel = {
        date: {
          year: this.projectSession.projectInfo.scd.getFullYear(),
          month: this.projectSession.projectInfo.scd.getMonth() + 1,
          day: this.projectSession.projectInfo.scd.getDate()
        }
      };
    }
  }

  isValidDate(date: any): Date {
    if (date) {
      var d = new Date(date);
      if (d.getFullYear() === 1 && d.getDate() === 1 && d.getMonth() === 0) {
        return null;
      }

      return d;
    }
    return null;

  }

  setupMap() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.marker.lat = place.geometry.location.lat();
          this.marker.lng = place.geometry.location.lng();
          this.googleMapData.lng = place.geometry.location.lng();
          this.googleMapData.lat = place.geometry.location.lat();

        });
      });

    });
  }

  openLocation() {
    this.location.load();
    this.modalLocation.show();
  }

  openCoordinates() {

    if (this.projectSession.projectInfo.coordinatesX && this.projectSession.projectInfo.coordinatesY) {
      this.googleMapData.lat = parseFloat(this.projectSession.projectInfo.coordinatesY.toString());
      this.googleMapData.lng = parseFloat(this.projectSession.projectInfo.coordinatesX.toString());
      this.marker = <IMarker>{
        lat: parseFloat(this.projectSession.projectInfo.coordinatesY.toString()),
        lng: parseFloat(this.projectSession.projectInfo.coordinatesX.toString())
      };
    }

    this.modalCoordinates.show();

  }

  openLoadImage() {
    this.modalImage.show();
  }

  hideLoadImage() {
    this.modalImage.hide();
  }

  saveCropImage() {
    if (this.dataImage.image) {
      this.projectImage.nativeElement.src = this.dataImage.image;
      this.projectSession.projectInfo.image = this.dataImage.image.toString().split(',')[1];
    }
    this.modalImage.hide();
  }

  openBudget() {
    //this.modalService.show(BudgetComponent, {class: 'modal-md'});
    //this.budgetComponent.setup();
    this.modalBudget.show();
  }

  mapClick(event) {
    this.marker.lat = event.coords.lat;
    this.marker.lng = event.coords.lng;
  }

  saveCoordinates() {
    this.projectSession.projectInfo.coordinatesY = this.marker.lat;
    this.projectSession.projectInfo.coordinatesX = this.marker.lng;
    if (this.marker.lat != null || this.marker.lng != null) {
      this.projectCoordinates = ('(' + this.projectSession.projectInfo.coordinatesY + ';' + this.projectSession.projectInfo.coordinatesX + ')');
    }
    this.modalCoordinates.hide();
  }

  onSave() {
    if (this.projectForm.valid) {
      this.busy = this.projectSession.save(this.imageUploadFile).subscribe((project: IProjectInformation) => {
        this.busy = null;
        this.loadImage();
        this.setupStatus();
      }, () => {
        this.busy = null;
      });
    }
  }

  onClose() {
    this.modalCoordinates.hide();
  }

  onNpdChange(event) {
    this.projectSession.projectInfo.npd = event.jsdate;
  }

  onOpsChange(event) {
    this.projectSession.projectInfo.opsd = event.jsdate;
    this.calculateEndDate();
  }

  onScChange(event) {
    this.projectSession.projectInfo.scd = event.jsdate;
  }

  onProjectEndChange(event) {
    this.projectSession.projectInfo.endDate = event.jsdate;
  }

  onApsChange(event) {
    this.projectSession.projectInfo.apsd = event.jsdate;
    this.calculateEndDate();
  }

  /* Actual Project Start Date
   o
   o If the user does not enter information here, the system must assume the same value
   as it is in the “Original Project Start Date”.*/


  calculateEndDate() {
    let endDate: Date = null;

    if (this.projectSession.projectInfo.contractDuration === null) {
      return null;
    }

    if (this.projectSession.projectInfo.apsd) {
      endDate = moment(this.projectSession.projectInfo.apsd).add(this.projectSession.projectInfo.contractDuration, 'day')
        .toDate();
    } else if (this.projectSession.projectInfo.opsd) {
      endDate = moment(this.projectSession.projectInfo.opsd).add(this.projectSession.projectInfo.contractDuration, 'day')
        .toDate();
      this.apsModel = {
        date: {
          year: this.projectSession.projectInfo.opsd.getFullYear(),
          month: this.projectSession.projectInfo.opsd.getMonth() + 1,
          day: this.projectSession.projectInfo.opsd.getDate()
        }
      };
    } else {
      return;
    }

    this.projectEndModel = {date: {year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate()}}
    this.projectSession.projectInfo.endDate = endDate;
  }

  loadDefaultImage(img: HTMLImageElement) {
    img.src = '/img/dafault_project_image.PNG';
  }

  changeLatLng() {
    if (!isNaN(parseFloat(this.marker.lat.toString()))) {
      this.marker.lat = parseFloat(this.marker.lat.toString());
    } else {
      this.marker.lat = 0;
    }
    if (!isNaN(parseFloat(this.marker.lng.toString()))) {
      this.marker.lng = parseFloat(this.marker.lng.toString());
    } else {
      this.marker.lng = 0;
    }
    this.googleMapData.lng = this.marker.lng;
    this.googleMapData.lat = this.marker.lat;
  }

}
