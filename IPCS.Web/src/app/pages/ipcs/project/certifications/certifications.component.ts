import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../../base.component';
import {IProjectCertification} from '../../../../api/models/iproject-certification';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute} from '@angular/router';
import {ProjectCertificationService} from '../../../../api/project-certification.service';
import {Subscription} from 'rxjs/Subscription';
import {CertificationComponent} from './certification/certification.component';
import {RetainedAmountComponent} from './retained-amount/retained-amount.component';
import {ProjectSessionService} from '../project-session.service';
import {ModalDirective} from 'ngx-bootstrap';
import {ProjectInformationService} from '../../../../api/project-information.service';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {concatAll} from 'rxjs/operator/concatAll';

import {Ng2DeviceService} from 'ng2-device-detector';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent extends BaseComponent implements OnInit {
  certificationList: IProjectCertification[];
  projectId: any;
  subscription: Subscription;

  @ViewChild('popupEdit')
  certificationEdit: CertificationComponent;
  @ViewChild('popupEditModal')
  popupEdit: ModalDirective;
  @ViewChild('popupRetainedModal')
  popupRetainedModal: ModalDirective;
  @ViewChild('retainedComponent')
  retainedComponent: RetainedAmountComponent;
  isDesktop = true;
  isNew = false;

  constructor(private route: ActivatedRoute,
              public projectCertificationService: ProjectCertificationService,
              public projectInformationService: ProjectInformationService,
              public projectSession: ProjectSessionService,
              private deviceService: Ng2DeviceService) {
    super();
  }

  ngOnInit() {
    this.isDesktop = this.deviceService.isDesktop();
    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.projectId = params.projectId;
        if (this.projectId) {
          this.busy = this.projectSession.get(this.projectId).subscribe((data) => {
            this.getCertifications();
          });
        }
      });
    }
  }

  getCertifications() {
    this.projectCertificationService.listCertification({projectId: this.projectId}).$observable.subscribe((certificationList: Array<IProjectCertification>) => {
      this.busy = null;
      this.certificationList = certificationList;
      this.calculateAcum();
    });
  }

  calculateAcum() {
    let acumulatedGrossCertifiedAmountValue = 0;
    let acumulatedRetainedAmountValue = 0;

    this.certificationList.forEach((certification: IProjectCertification) => {
      certification.retainedAmount = this.projectSession.projectInfo.retainedAmount;
      certification.retained = (certification.retainedAmount * certification.grossAmount) / 100;
      certification.netCertifiedAmount = certification.grossAmount - certification.retained;
      acumulatedGrossCertifiedAmountValue += certification.grossAmount;
      certification.acumulatedGrossCertifiedAmount = acumulatedGrossCertifiedAmountValue;
      acumulatedRetainedAmountValue += certification.retained;
      certification.acumulatedRetainedAmount = acumulatedRetainedAmountValue;
    });
  }

  newCertification() {
    this.popupEdit.show();
    this.certificationEdit.setup(<IProjectCertification>{currencyId: 1, date: new Date()}, 'Add New Certification');
  }

  changeRetainedAmount() {
    this.popupRetainedModal.show();
    this.retainedComponent.setup(this.projectSession.projectInfo.retainedAmount);
  }

  saveRetainedAmount(retained: number) {
    this.popupRetainedModal.hide();
    this.busy = this.projectInformationService.updateRatainedAmount({
      projectId: this.projectId,
      retainedAmount: retained
    }).$observable.subscribe(() => {
      this.busy = null;
      this.projectSession.projectInfo.retainedAmount = retained;
      this.calculateAcum();
    })
  }

  editCertification(certification: IProjectCertification) {
    this.popupEdit.show();
    this.certificationEdit.setup(certification, 'Edit Certification');
  }

  save(certification: IProjectCertification) {
    this.projectSession.projectInfo.lastModify = new Date();
    this.projectSession.updateLastModify(this.projectSession.projectInfo.lastModify);
    if (!certification.id) {
      this.busy = this.projectCertificationService.add(certification).$observable.subscribe((result: IProjectCertification) => {
        this.busy = null;
        this.popupEdit.hide();
        this.getCertifications();
      });
    } else {
      this.busy = this.projectCertificationService.save(certification).$observable.subscribe((result: IProjectCertification) => {
        this.busy = null;
        this.popupEdit.hide();
        this.getCertifications();

      });
    }
  }

  deleteCertification(certification: IProjectCertification) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this certification',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.busy = this.projectCertificationService.delete({id: certification.id}).$observable.subscribe(() => {
        this.busy = null;
        this.certificationList.splice(this.certificationList.indexOf(certification), 1);
      }, () => {
        this.busy = null;
      });

    });

  }

}
