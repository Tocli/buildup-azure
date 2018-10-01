import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-privacy-and-terms',
  templateUrl: './privacy-and-terms.component.html',
  styleUrls: ['./privacy-and-terms.component.scss']
})
export class PrivacyAndTermsComponent implements OnInit {

  public modalRef: BsModalRef;
  @ViewChild('template')
  template: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  show() {
    this.modalRef = this.modalService.show(this.template);
  }

}
