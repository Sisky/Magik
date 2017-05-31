/**
 * Created by Scott Mackenzie on 23/03/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes, CanActivate} from "@angular/router";

import HomeComponent from "../components/home/home";
import CalendarComponent from "../components/planner/calendar/calendar";
import RequestsComponent from "../components/requests/requests";
import {CallbackComponent} from "../components/callback/callback";



const routes: Routes = [
    {path: '',           component: HomeComponent},
    {path: 'calendar',   component: CalendarComponent},
    {path: 'requests',   component: RequestsComponent},
    {path: 'callback',   component: CallbackComponent},
    {path: '**',         redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
