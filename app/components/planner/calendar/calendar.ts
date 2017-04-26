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

    date: Date;
    tuesDate: Date;
    wedsDate: Date;
    thursDate: Date;
    friDate: Date;

    bookings: Booking[];
    tuesdayBookings: Booking[];
    wednesdayBookings:Booking[];
    thursdayBookings:Booking[];
    fridayBookings: Booking[];

    constructor(private bookingService: BookingService, private dateService: DateService, private levelService: LevelService) {
        //hard coded for testing
        this.level = levelService.getLevel();

        this.date = dateService.getMonday();
        this.tuesDate = dateService.getTuesday();
        this.wedsDate = dateService.getWednesday();
        this.thursDate = dateService.getThursday();
        this.friDate = dateService.getFriday();

        this.bookings = bookingService.getDayBooking(this.date, this.level);
        this.tuesdayBookings = bookingService.getDayBooking(this.tuesDate, this.level);
        this.wednesdayBookings = bookingService.getDayBooking(this.wedsDate, this.level);
        this.thursdayBookings = bookingService.getDayBooking(this.thursDate, this.level);
        this.fridayBookings = bookingService.getDayBooking(this.friDate, this.level);

        //re render with new date
        let _subscription = dateService.dateChange$.subscribe((value) => {
            this.date = dateService.getMonday();
            this.bookings = bookingService.getDayBooking(this.date, this.level);
            this.tuesDate = dateService.getTuesday();
            this.tuesdayBookings = bookingService.getDayBooking(this.tuesDate, this.level);
            this.wedsDate = dateService.getWednesday();
            this.wednesdayBookings = bookingService.getDayBooking(this.wedsDate, this.level);
            this.thursDate = dateService.getThursday();
            this.thursdayBookings = bookingService.getDayBooking(this.thursDate, this.level);
            this.friDate = dateService.getFriday();
            this.fridayBookings = bookingService.getDayBooking(this.friDate, this.level);
        });
        //re render with new level
        let _subscriptionL = levelService.levelChange$.subscribe((value) => {
            this.level = value;

            this.date = dateService.getMonday();
            this.bookings = bookingService.getDayBooking(this.date, this.level);
            this.tuesDate = dateService.getTuesday();
            this.tuesdayBookings = bookingService.getDayBooking(this.tuesDate, this.level);
            this.wedsDate = dateService.getWednesday();
            this.wednesdayBookings = bookingService.getDayBooking(this.wedsDate, this.level);
            this.thursDate = dateService.getThursday();
            this.thursdayBookings = bookingService.getDayBooking(this.thursDate, this.level);
            this.friDate = dateService.getFriday();
            this.fridayBookings = bookingService.getDayBooking(this.friDate, this.level);
        });
    }









}

