import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import NavbarComponent from './components/navbar/navbar';
import PlannerComponent from './components/planner/planner';
import HeaderComponent from './components/header/header';
import SessionsComponent from './components/planner/sessions/sessions';

@NgModule({
    imports:      [
        BrowserModule
    ],
    declarations: [
        NavbarComponent,
        PlannerComponent,
        HeaderComponent,
        SessionsComponent
    ],
    bootstrap:    [ PlannerComponent ]
})

export class AppModule { }
