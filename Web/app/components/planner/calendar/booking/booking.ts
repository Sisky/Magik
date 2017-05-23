import {Component, Input } from "@angular/core";
import {ModalModule} from "ngx-modal";
import {BookingService} from "../../../../services/BookingService";
import CalendarComponent from "../calendar";
import {FormBuilder, FormGroup} from "@angular/forms";

/**
 * Created by Scott Mackenzie on 26/04/2017.
 */
declare var $: any;

@Component({
    selector: 'booking',
    templateUrl:'./app/components/planner/calendar/booking/booking.html',
    styleUrls:['./app/components/planner/calendar/booking/booking.css']
})

export default class BookingComponent {

    formModel: FormGroup;




    @Input() url: string;
    @Input() deptAM: string;
    @Input() surgAM: string;
    @Input() deptPM: string;
    @Input() surgPM: string;
    @Input() level: number;
    @Input() date: Date;
    @Input() room: number;
    changedBookings: Object[];

    constructor(private bookingService: BookingService, private calendar: CalendarComponent) {
        const fb = new FormBuilder();
        this.formModel = fb.group({
            'f_deptAM': [],
            'f_surgAM': [],
            'f_deptPM': [],
            'f_surgPM': []
        })
    }

    changeLog() {
        // //Get change log
        this.bookingService.getRoomHistoryBooking(this.date,this.level,this.room)
            .subscribe(data => this.changedBookings = (data as any).results,
                err => {
                    // Log errors if any
                    console.log(err);
                });
    }

    test() {
        if(this.formModel.dirty) {
            console.log(this.formModel.get("f_deptAM").value);
        } else {
            console.log("clean");
        }

    }

    save() {
        if(this.formModel.dirty) {
            // POST original booking
            this.bookingService.postNewBooking(this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 0).subscribe();

            // Update orginal to new
            if(this.formModel.get("f_deptAM").dirty) {
                this.deptAM = this.formModel.get("f_deptAM").value;
            }
            if(this.formModel.get("f_deptPM").dirty) {
                this.deptPM = this.formModel.get("f_deptPM").value;
            }
            if(this.formModel.get("f_surgAM").dirty) {
                this.surgAM = this.formModel.get("f_surgAM").value;
            }
            if(this.formModel.get("f_surgPM").dirty) {
                this.surgPM = this.formModel.get("f_surgPM").value;
            }

            this.bookingService.updateRoomBooking(this.url, this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 1).subscribe();
            //update Calendar
            this.calendar.populate();
        }
    }
}