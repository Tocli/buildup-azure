import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../../base.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute} from '@angular/router';
import {IProjectContact} from '../../../../api/models/iproject-contact';
import {ParticipantComponent} from './participant/participant.component';
import {ProjectContactService} from '../../../../api/project-contact.service';
import {Subscription} from 'rxjs/Subscription';
import {ModalDirective} from 'ngx-bootstrap';
import {ProjectSessionService} from '../project-session.service';



@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent extends BaseComponent implements OnInit {

  contactList: IProjectContact[];
  projectId: any;
  subscription: Subscription;

  @ViewChild('popupParticipantComponent')
  popupParticipantComponent: ParticipantComponent;
  @ViewChild('popupParticipantModal')
  popupParticipantModal: ModalDirective;

  constructor(private modalService: BsModalService,
              private route: ActivatedRoute,
              private projectContact: ProjectContactService,
              private projectSession: ProjectSessionService) {
    super();

  }

  ngOnInit() {

    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.projectId = params.projectId;
        if (this.projectId) {
          this.getContacts();
        }
      })
    }
  }

  getContacts() {
    this.busy = this.projectContact.listContact({projectId: this.projectId}).$observable.subscribe((contactList: Array<IProjectContact>) => {
      this.busy = null;
      this.contactList = contactList;
    });
  }

  newParticipant() {
    this.popupParticipantComponent.setup(<IProjectContact>{}, 'Add New Participant');
    this.popupParticipantModal.show();
  }

  save(contact: IProjectContact) {
    this.projectSession.projectInfo.lastModify = new Date();
    this.projectSession.updateLastModify(this.projectSession.projectInfo.lastModify);
    if (!contact.id) {
      this.busy = this.projectContact.add(contact).$observable.subscribe((result: IProjectContact) => {
        this.busy = null;
        this.popupParticipantModal.hide();
        this.getContacts();
      })
    } else {
      this.busy = this.projectContact.save(contact).$observable.subscribe((result: IProjectContact) => {
        this.busy = null;
        this.popupParticipantModal.hide();
        this.getContacts();
      })
    }
  }

  editContact(contact: IProjectContact) {
    this.popupParticipantModal.show();
    this.popupParticipantComponent.setup(contact, 'Edit Participant');
  }

  deleteContact(contact: IProjectContact) {

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Participant',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.busy = this.projectContact.delete({id: contact.id}).$observable.subscribe(() => {
        this.busy = null;
        this.contactList.splice(this.contactList.indexOf(contact), 1);
      }, () => {
        this.busy = null;
      });
    });
  }

}
