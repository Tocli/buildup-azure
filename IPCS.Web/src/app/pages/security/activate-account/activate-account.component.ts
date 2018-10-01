import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../api/account-service.service';
import { BaseComponent } from '../../../base.component';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent extends BaseComponent implements OnInit {

  activating:boolean = true;

  isError:boolean = false;

  errorString:string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService:AccountService) { super(); }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      let guid = <string>params.guid;

      this.accountService.activateAccount({guid: guid})
        .$observable
        .subscribe((result: any)=> {
            this.activating = false;
          },
          (error: any)=> {
            this.errorString = error;
            this.activating = false;
            this.isError = true;

          });

    });


  }

}
