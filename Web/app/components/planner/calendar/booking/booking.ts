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
    @Input() level: number;
    @Input() date: Date;
    @Input() room: number;

    constructor() {}

    popUp() {
        console.log(this.deptAM );
        console.log(this.deptPM );
        console.log(this.surgAM );
        console.log(this.surgPM );
        console.log(this.level);
        console.log(this.date);
        console.log(this.room);
    }
}