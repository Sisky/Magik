/**
 * Created by Scott Mackenzie on 23/03/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import HomeComponent from "../components/home/home";
import CalendarComponent from "../components/planner/calendar/calendar";
import RequestsComponent from "../components/requests/requests";

const routes: Routes = [
    {path: '',           component: HomeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'requests', component: RequestsComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
