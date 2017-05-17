/**
 * Created by Scott Mackenzie on 28/03/2017.
 */

import {Component, Input} from '@angular/core';
import {Booking, BookingService} from '../../../services/BookingService';
import {DateService} from "../../../services/DateService";
import {Subscription} from "rxjs";
import {LevelService} from "../../../services/LevelService";


@Component({
    selector: 'calendar',
    templateUrl:'./app/components/planner/calendar/calendar.html',
    styleUrls:['./node_modules/bootstrap/dist/css/bootstrap.css']
})

export default class CalendarComponent {
    level: number;
    beep: string;

    date: Date;
    tuesDate: Date;
    wedsDate: Date;
    thursDate: Date;
    friDate: Date;

    bookings:Object[];
    tuesdayBookings:Object[];
    wednesdayBookings:Object[];
    thursdayBookings:Object[];
    fridayBookings:Object[];

    constructor(private bookingService: BookingService, private dateService: DateService, private levelService: LevelService) {
        //hard coded for testing
        this.level = levelService.getLevel();

        this.date = dateService.getMonday();
        this.tuesDate = dateService.getTuesday();
        this.wedsDate = dateService.getWednesday();
        this.thursDate = dateService.getThursday();
        this.friDate = dateService.getFriday();

        this.bookingService.getLevelBooking(this.date, this.level)
            .subscribe(data => this.bookings = data,
                err => {
                    // Log errors if any
                    console.log(err);
                });
        //
        // this.bookingService.getLevelBooking(this.tuesDate, this.level)
        //     .then(data => this.tuesdayBookings = data);
        //
        // this.bookingService.getLevelBooking(this.wedsDate, this.level)
        //     .then(data => this.wednesdayBookings = data);
        //
        // this.bookingService.getLevelBooking(this.thursDate, this.level)
        //     .then(data => this.thursdayBookings = data);
        //
        // this.bookingService.getLevelBooking(this.friDate, this.level)
        //     .then(data => this.fridayBookings = data);




        //re render with new date
        let _subscription = dateService.dateChange$.subscribe((value) => {

            this.date = dateService.getMonday();
            this.tuesDate = dateService.getTuesday();
            this.wedsDate = dateService.getWednesday();
            this.thursDate = dateService.getThursday();
            this.friDate = dateService.getFriday();

            this.bookingService.getLevelBooking(this.date, this.level)
                .subscribe(data => this.bookings = data,
                    err => {
                        // Log errors if any
                        console.log(err);
                    });

            // this.bookingService.getLevelBooking(this.tuesDate, this.level)
            //     .then(data => this.tuesdayBookings = data);
            //
            // this.bookingService.getLevelBooking(this.wedsDate, this.level)
            //     .then(data => this.wednesdayBookings = data);
            //
            // this.bookingService.getLevelBooking(this.thursDate, this.level)
            //     .then(data => this.thursdayBookings = data);
            //
            // this.bookingService.getLevelBooking(this.friDate, this.level)
            //     .then(data => this.fridayBookings = data);
        });
        //re render with new level
        let _subscriptionL = levelService.levelChange$.subscribe((value) => {
            this.level = value;

            this.date = dateService.getMonday();
            this.tuesDate = dateService.getTuesday();
            this.wedsDate = dateService.getWednesday();
            this.thursDate = dateService.getThursday();
            this.friDate = dateService.getFriday();

            this.bookingService.getLevelBooking(this.date, this.level)
                .subscribe(data => this.bookings = data,
                    err => {
                        // Log errors if any
                        console.log(err);
                    });

                // .then(data => this.bookings = data);
            //
            // this.bookingService.getLevelBooking(this.tuesDate, this.level)
            //     .then(data => this.tuesdayBookings = data);
            //
            // this.bookingService.getLevelBooking(this.wedsDate, this.level)
            //     .then(data => this.wednesdayBookings = data);
            //
            // this.bookingService.getLevelBooking(this.thursDate, this.level)
            //     .then(data => this.thursdayBookings = data);
            //
            // this.bookingService.getLevelBooking(this.friDate, this.level)
            //     .then(data => this.fridayBookings = data);
        });
    }











}

