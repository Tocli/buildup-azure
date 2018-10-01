import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {EntityService} from '../../../../../api/entity.service';
import {IEntity} from '../../../../../api/models/ientity';
import {IProjectContact} from '../../../../../api/models/iproject-contact';
import {ProjectContactService} from '../../../../../api/project-contact.service';
import {BaseComponent} from '../../../../../base.component';
import {ProjectSessionService} from '../../project-session.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent extends BaseComponent implements OnInit {

  newContact: IProjectContact = <IProjectContact>{};
  entitiesList: IEntity[];
  projectId: number;
  title: string;

  @ViewChild('newParticipantForm')
  form: NgForm;

  @Output()
  save: EventEmitter<IProjectContact> = new EventEmitter<IProjectContact>();
  @Output()
  cancel = new EventEmitter();

  constructor(private entityService: EntityService,
              private projectContactService: ProjectContactService,
              public projectSession: ProjectSessionService) {
    super();
  }

  ngOnInit() {
    jQuery('.phone').intlTelInput();
    this.loadEntities();
  }

  setup(contact: IProjectContact, title: string) {
    this.title = title;
    this.newContact = Object.assign({}, contact);
    if (!this.newContact.id) {
      this.form.resetForm();
      this.newContact.tel = '';
    }
    jQuery('.phone').intlTelInput('setNumber', this.newContact.tel);

  }

  loadEntities() {
    this.entityService.list().$observable.subscribe((entitiesList: IEntity[]) => {
      this.entitiesList = entitiesList;
    });
  }

    saveNewParticipant(isValid) {
    if (isValid) {
      this.newContact.tel = jQuery('.phone').intlTelInput('getNumber');
      this.newContact.projectId = this.projectSession.projectInfo.id;
      this.save.emit(this.newContact);
    }
  }

  onClose() {
    this.newContact = <IProjectContact>{};
    this.cancel.emit();
  }
}
