import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import ApplicationComponent from './components/application/application';
import HomeComponent from './components/home/home';
import {AppRoutingModule} from "./modules/app.routing";
import DisclaimerComponent from "./components/disclaimer/disclaimer";

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule
  ],
  declarations: [
      ApplicationComponent,
      HomeComponent,
      DisclaimerComponent
  ],
  providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
