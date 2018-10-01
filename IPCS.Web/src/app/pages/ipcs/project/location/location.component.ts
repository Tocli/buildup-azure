import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ProjectSessionService} from '../project-session.service';
import {IProjectLocation} from '../../../../api/models/iproject-location';
import {LocationDataService} from '../../../../api/location-data.service';
import {ICountry} from '../../../../api/models/icountry';
import {IState} from '../../../../api/models/istate';
import {ICity} from '../../../../api/models/icity';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  location: IProjectLocation = <IProjectLocation>{};
  countries: ICountry[];
  states: IState[] = [];
  cities: ICity[] = [];
  country: ICountry = <ICountry>{};
  state: IState = <IState>{};
  @Output()
  hide = new EventEmitter();
  @ViewChild('locationForm')
  locationForm: NgForm;


  constructor(private projectSessionService: ProjectSessionService,
              private locationDataService: LocationDataService) {
  }

  ngOnInit() {

  }

  onClose() {
    this.hide.emit();
  }

  load() {
    // this.locationForm.resetForm();
    this.location = Object.assign({}, this.projectSessionService.projectInfo.projectLocation);
    this.locationDataService.listCountries().$observable.subscribe((countries: ICountry[]) => {
      this.countries = countries;
      if (this.location.country) {
        //this.location.country = '';
        this.countryChange();
      }

    });
  }

  onSave(isValid: boolean) {
    if (isValid) {
      this.projectSessionService.projectInfo.projectLocation = this.location;
      this.hide.emit();
    }
  }

  countryChange() {
    this.locationDataService.listStates({countryCode: this.location.country}).$observable.subscribe((states) => {
      this.states = states;
      if (this.states.length > 0) {
        if (this.location.state) {
          this.stateChange();
        }
      } else {
        this.cities = [];
        if(!this.location.city && !this.location.state){
          this.location.city = '';
          this.location.state = '';
        }else{
          this.location.city = this.projectSessionService.projectInfo.projectLocation.city;
          this.location.state = this.projectSessionService.projectInfo.projectLocation.state;
        }
      }

    });
  }

  stateChange() {
    this.locationDataService.listCities({stateCode: this.location.state}).$observable.subscribe((cities) => {
      this.cities = cities;
    });
  }

}
