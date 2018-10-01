import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanLoad} from '@angular/router';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectComponent} from './project/project.component';
import {DashboardComponent} from './project/dashboard/dashboard.component';
import {CertificationsComponent} from './project/certifications/certifications.component';
import {DailyReportComponent} from './project/daily-report/daily-report.component';
import {ChangeOrderComponent} from './project/change-order/change-order.component';
import {MainComponent} from './main/main.component';
import {CanActivteOAuthGuardService} from '../../oauth/can-activte-oauth-guard.service';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {DailyReportDeactivate} from './project/daily-report/daily-report-deactivate';
import {MainComponentCanLoad} from './main/main-component-can-load';


const routes: Routes = [
  {path: '', redirectTo: 'build-up', pathMatch: 'full'},
  {
    path: 'build-up', component: MainComponent, canActivate: [CanActivteOAuthGuardService], canLoad: [MainComponentCanLoad],
    children: [
      {path: '', redirectTo: 'projects', pathMatch: 'full'},
      {path: 'projects', component: ProjectsComponent},
      {path: 'projects/:projectId/dashboard', component: DashboardComponent},
      {path: 'projects/:projectId/certifications', component: CertificationsComponent},
      {path: 'projects/:projectId/dailyreport', component: DailyReportComponent, canDeactivate: [DailyReportDeactivate]},
      {path: 'projects/:projectId/changeorder', component: ChangeOrderComponent},

      {path: 'project/new', component: ProjectComponent},
      {path: 'project/:projectId', component: ProjectComponent},

      {path: 'profile/changepassword', component: ChangePasswordComponent},
      {path: 'profile', component: MyProfileComponent},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpcsRoutingModule {
}
