import { TestSummaryComponent } from './test-summary/test-summary.component';
import { TestComponent } from './test/test.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { TestSelectComponent } from './test-select/test-select.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ResourcesComponent } from './resources/resources.component';
import { StatsComponent } from './stats/stats.component';
const approutes: Routes = [
    {path: 'test', component: TestComponent},
    {path: 'test-select', component: TestSelectComponent},
    {path: 'test-summary', component: TestSummaryComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-details', component: UserDetailsComponent},
    {path: 'resources', component: ResourcesComponent},
    {path: '', component: LoginComponent},
    {path: 'stats', component: StatsComponent}


];

@NgModule({

  imports: [
      RouterModule.forRoot(approutes)],
  exports: [
      RouterModule
  ]
})


export class AppRoutingModule {

}
