import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';




import ApplicationComponent from './components/application/application';
import HomeComponent from './components/home/home';
import {AppRoutingModule} from "./modules/app.routing";
import DisclaimerComponent from "./components/disclaimer/disclaimer";
import HeaderComponent from "./components/planner/header/header";
import CalendarComponent from "./components/planner/calendar/calendar";
import {BookingService} from "./services/BookingService";
import {DateService} from "./services/DateService";
import {DropdownModule} from "ngx-dropdown";
import {LevelService} from "./services/LevelService";
import BookingComponent from "./components/planner/calendar/booking/booking";
import {HttpModule} from "@angular/http";
import {ModalModule} from "ngx-modal";
import {PermissionService} from "./services/PermissionService";
import NavBarComponent from "./components/nav-bar/nav-bar";




@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      DropdownModule,
      HttpModule,
      ModalModule
      ],
  declarations: [
      ApplicationComponent,
      HomeComponent,
      DisclaimerComponent,
      NavBarComponent,
      HeaderComponent,
      CalendarComponent,
      BookingComponent,
       ],
  providers: [
            BookingService,
            DateService,
            LevelService,
            PermissionService,
            {provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
