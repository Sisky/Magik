import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ApplicationComponent } from './components/application/application.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestsComponent } from './components/requests/requests.component';
import { CalendarComponent } from './components/planner/calendar/calendar.component';
import { HeaderComponent } from './components/planner/header/header.component';
import { BookingComponent } from './components/planner/calendar/booking/booking.component';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import {RoutingModule} from "./modules/routing.module";
import {BookingService} from "./services/booking.service";
import {DateService} from "./services/date.service";
import {LevelService} from "./services/level.service";
import {AuthService} from "./services/auth.service";
import {PermissionService} from "./services/permission.service";
import {DataService} from "./services/data.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {DropdownModule} from "ngx-dropdown";
import {ModalModule} from "ngx-modal";

@NgModule({
  declarations: [
    ApplicationComponent,
    CallbackComponent,
    HomeComponent,
    ProfileComponent,
    RequestsComponent,
    CalendarComponent,
    HeaderComponent,
    BookingComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpModule,
    DropdownModule,
    ModalModule
  ],
  providers: [
    BookingService,
    DateService,
    LevelService,
    AuthService,
    PermissionService,
    DataService,
    {provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ApplicationComponent]
})
export class AppModule { }