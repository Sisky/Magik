import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import ApplicationComponent from './components/application/application';
import HomeComponent from './components/home/home';
import {AppRoutingModule} from "./modules/app.routing";
import DisclaimerComponent from "./components/disclaimer/disclaimer";
import SideNavComponent from "./components/side-nav/side-nav";
import HeaderComponent from "./components/planner/header/header";
import CalendarComponent from "./components/planner/calendar/calendar";
import {BookingService} from "./services/BookingService";
import {DateService} from "./services/DateService";
import {DropdownModule} from "ngx-dropdown";
import {LevelService} from "./services/LevelService";

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      DropdownModule
  ],
  declarations: [
      ApplicationComponent,
      HomeComponent,
      DisclaimerComponent,
      SideNavComponent,
      HeaderComponent,
      CalendarComponent
  ],
  providers: [
            BookingService,
            DateService,
            LevelService,
            {provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
