import { Booking, BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { LevelService } from '../../../services/level.service';
import { PermissionService } from '../../../services/permission.service';
import { DateService } from '../../../services/date.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const moment = require('moment');
moment().format();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent implements OnInit {

  level: number;
  permission: number;

  mondayDate: Date;
  tuesdayDate: Date;
  wednesdayDate: Date;
  thursdayDate: Date;
  fridayDate: Date;

  mondayBookings:Booking[];
  tuesdayBookings:Booking[];
  wednesdayBookings:Booking[];
  thursdayBookings:Booking[];
  fridayBookings:Booking[];

  constructor(public router: Router, private auth: AuthService, private bookingService: BookingService, private dateService: DateService, private levelService: LevelService, private permissionService: PermissionService) {

    if (!auth.isAuthenticated()) {
      this.auth.login();
    }
  }

  ngOnInit() {

    if(this.auth.isAuthenticated()) {

      this.getLevel();
      this.getDates();
      this.populate();

      // Use local storage so it is consistant even on page refresh
      if (!localStorage.getItem('permission')) {
        this.permissionService.setPermission();
      }

      const _subscription = this.dateService.dateChange$.subscribe((value) => {
        this.getDates();
        this.populate();
      });

      const _subscriptionL = this.levelService.levelChange$.subscribe((value) => {
        this.getLevel();
        this.dateService.setDate(new Date('2017-09-01'));
        this.populate();
      });

    }

  }

  public getPermission(): string {
    return this.permissionService.getPermission();
  }

  private getDates() {

    this.mondayDate = this.dateService.getMonday();
    this.tuesdayDate = this.dateService.getTuesday();
    this.wednesdayDate = this.dateService.getWednesday();
    this.thursdayDate = this.dateService.getThursday();
    this.fridayDate = this.dateService.getFriday();

  }

  private getLevel() {

    this.level = this.levelService.getLevel();

  }

  public populate() {

    this.bookingService.getLevelBooking(this.mondayDate, this.level)
      .subscribe(data => this.mondayBookings = (data as any).results,
                 err => {
          // Log errors if any
          console.log(err);
        });

    this.bookingService.getLevelBooking(this.tuesdayDate, this.level)
      .subscribe(data => this.tuesdayBookings = (data as any).results,
                 err => {
          // Log errors if any
          console.log(err);
        });

    this.bookingService.getLevelBooking(this.wednesdayDate, this.level)
      .subscribe(data => this.wednesdayBookings = (data as any).results,
                 err => {
          // Log errors if any
          console.log(err);
        });

    this.bookingService.getLevelBooking(this.thursdayDate, this.level)
      .subscribe(data => this.thursdayBookings = (data as any).results,
                 err => {
          // Log errors if any
          console.log(err);
        });

    this.bookingService.getLevelBooking(this.fridayDate, this.level)
      .subscribe(data => this.fridayBookings = (data as any).results,
                 err => {
          // Log errors if any
          console.log(err);
        });

  }

}
