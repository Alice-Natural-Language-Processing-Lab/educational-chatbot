import { StatsService } from './services/stats.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import {ReactiveFormsModule}
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { TestService } from './services/test.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {  UserService } from './services/user.service';
import { TestSelectComponent } from './test-select/test-select.component';
import { AppRoutingModule } from './app-routing.module';
import { TestSummaryComponent } from './test-summary/test-summary.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceService } from './services/resource.service';
import { StatsComponent } from './stats/stats.component';
import { DialogflowComponent } from './dialogflow/dialogflow.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RegisterComponent,
    LoginComponent,
    TestSelectComponent,
    TestSummaryComponent,
    NavbarComponent,
    UserDetailsComponent,
    ResourcesComponent,
    StatsComponent,
    DialogflowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    TestService,
    UserService,
    ResourceService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
