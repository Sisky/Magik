import {HomeComponent} from "../components/home/home.component";
import {CalendarComponent} from "../components/planner/calendar/calendar.component";
import {RequestsComponent} from "../components/reports/requests/requestsHome.component";
import {CallbackComponent} from "../components/callback/callback.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {ReportsComponent} from "../components/reports/reports.component";
import {HistoryComponent} from "../components/reports/history/history.component";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SixWeekComponent} from "../components/reports/six-week/six-week.component";

const routes: Routes = [
  {path: '',           component: HomeComponent},
  {path: 'calendar',   component: CalendarComponent},
  {path: 'callback',   component: CallbackComponent},
  {path: 'profile',   component: ProfileComponent},
  {path: 'reports', component: ReportsComponent,
      children: [
          { path: 'history', component: HistoryComponent},
          { path: 'six-week', component: SixWeekComponent},
          { path: 'requests', component: RequestsComponent},
      ]
  },
  {path: '**',         redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
