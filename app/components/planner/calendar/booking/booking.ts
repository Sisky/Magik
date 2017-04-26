import {Component, Input} from "@angular/core";



/**
 * Created by Scott Mackenzie on 26/04/2017.
 */

@Component({
    selector: 'booking',
    templateUrl:'./app/components/planner/calendar/booking/booking.html',
    styleUrls:['./app/components/planner/calendar/booking/booking.css']
})



export default class BookingComponent {

    @Input() deptAM: string;
    @Input() surgAM: string;
    @Input() deptPM: string;
    @Input() surgPM: string;

    constructor() {}
}