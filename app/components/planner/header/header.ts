import {Component, Output} from '@angular/core';
import {EventEmitter} from "@angular/common/src/facade/async";
import {DateService} from "../../../services/DateService";
declare var moment: any;

@Component({
    selector: 'header',
    templateUrl:'./app/components/planner/header/header.html',
    styleUrls:['./node_modules/bootstrap/dist/css/bootstrap.css']
})
export default class HeaderComponent {

    today: string;
    todayDate: Date;


    constructor(private dateService: DateService) {
        this.todayDate = dateService.getDate();
        this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');
        dateService.setDate(this.todayDate);


    }
    //gets the previous monday formats 'Monday January 2nd 2017' style
    backWeek() {
        this.todayDate.setDate(this.todayDate.getDate()-7);
        this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');
        this.dateService.setDate(this.todayDate);

    }
    //gets the next monday
    forwardWeek() {
        this.todayDate.setDate(this.todayDate.getDate()+7);
        this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');
        this.dateService.setDate(this.todayDate);

    }

}
