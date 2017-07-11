/**
 * Created by Scott Mackenzie on 28/03/2017.
 */

import {Component, Injectable, Input} from '@angular/core';
import {Booking, BookingService} from '../../../services/BookingService';
import {DateService} from "../../../services/DateService";
import {Subscription} from "rxjs";
import {LevelService} from "../../../services/LevelService";
import {PermissionService} from "../../../services/PermissionService";
import {AuthService} from "../../../services/AuthService";
import {Router} from "@angular/router";

@Component({
    selector: 'calendar',
    templateUrl:'./app/components/planner/calendar/calendar.html',
    styleUrls:['./node_modules/bootstrap/dist/css/bootstrap.css']
})

@Injectable()
export default class CalendarComponent {
    level: number;

    date: Date;
    tuesDate: Date;
    wedsDate: Date;
    thursDate: Date;
    friDate: Date;

    mondayBookings:Booking[];
    tuesdayBookings:Booking[];
    wednesdayBookings:Booking[];
    thursdayBookings:Booking[];
    fridayBookings:Booking[];

    constructor(public router: Router, private auth: AuthService, private bookingService: BookingService, private dateService: DateService, private levelService: LevelService, private permissionService: PermissionService) {

        if(!auth.isAuthenticated()) {
            //cannot be on this page
            this.auth.login();
        }

    }

    ngOnInit() {
        if(this.auth.isAuthenticated()) {
            this.level = this.levelService.getLevel();

            this.populate();

            let _subscription = this.dateService.dateChange$.subscribe((value) => {
                this.populate()
            });
            //re render with new level
            let _subscriptionL = this.levelService.levelChange$.subscribe((value) => {
                this.populate();
            });


        } else {
            console.log("beep");
        }

    }



    populate() {
        this.level = this.levelService.getLevel();

        this.date = this.dateService.getMonday();
        this.tuesDate = this.dateService.getTuesday();
        this.wedsDate = this.dateService.getWednesday();
        this.thursDate = this.dateService.getThursday();
        this.friDate = this.dateService.getFriday();

        //refreshes permission
        // this.permissionService.getPermission();

        //Monday
        this.bookingService.getLevelBooking(this.date, this.level)
            .subscribe(data => this.mondayBookings = (data as any).results,
                err => {
                    // Log errors if any
                    console.log(err);
                });
        //Tuesday
        this.bookingService.getLevelBooking(this.tuesDate, this.level)
            .subscribe(data => this.tuesdayBookings = (data as any).results,
                err => {
                    // Log errors if any
                    console.log(err);
                });
        //Wednesday
        this.bookingService.getLevelBooking(this.wedsDate, this.level)
            .subscribe(data => this.wednesdayBookings = (data as any).results,
                err => {
                    // Log errors if any
                    console.log(err);
                });
        //Thursday
        this.bookingService.getLevelBooking(this.thursDate, this.level)
            .subscribe(data => this.thursdayBookings = (data as any).results,
                err => {
                    // Log errors if any
                    console.log(err);
                });
        //Friday
        this.bookingService.getLevelBooking(this.friDate, this.level)
            .subscribe(data => this.fridayBookings = (data as any).results,
                err => {
                    // Log errors if any
                    console.log(err);
                });
    }
}

