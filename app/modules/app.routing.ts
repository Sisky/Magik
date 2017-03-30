/**
 * Created by Scott Mackenzie on 23/03/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import HomeComponent from "../components/home/home";
import DisclaimerComponent from "../components/disclaimer/disclaimer";
import CalenderComponent from "../components/planner/calender/calender";

const routes: Routes = [
    {path: '',           component: HomeComponent},
    {path: 'disclaimer', component: DisclaimerComponent},
    {path: 'calender', component: CalenderComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
