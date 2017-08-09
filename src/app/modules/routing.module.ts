import {HomeComponent} from "../components/home/home.component";
import {CalendarComponent} from "../components/planner/calendar/calendar.component";
import {RequestsComponent} from "../components/requests/requests.component";
import {CallbackComponent} from "../components/callback/callback.component";
import {ProfileComponent} from "../components/profile/profile.component";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '',           component: HomeComponent},
  {path: 'calendar',   component: CalendarComponent},
  {path: 'requests',   component: RequestsComponent},
  {path: 'callback',   component: CallbackComponent},
  {path: 'profile',   component: ProfileComponent},
  {path: '**',         redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
