import { Component, OnInit } from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";

var moment = require('moment');
moment().format();

@Component({
  selector: 'app-six-week',
  templateUrl: './six-week.component.html',
  styleUrls: ['./six-week.component.css']
})
export class SixWeekComponent implements OnInit {

    bookingHistory: Booking[] = [];
    filteredHistory: Booking[] = [];
    groupSessionsArray: any[] = [];
    tempArr: any[] = [];
    completeArray: any[] = [];

    gatheredGroups: Boolean = false;



    constructor(private bookingService: BookingService) {

    }

    ngOnInit() {

        this.bookingService.getAllHistoryCreated()
            .subscribe(
                data => {
                    this.bookingHistory = (data as any).results;
                    console.log(this.bookingHistory);
                },
                err => {
                    // Log errors if any
                    console.log(err);
                },
                () => {

                }
            );
    }

    filter(date?: Date) {

        if(date) {
            //Do something
        } else {

            let date = moment(new Date()).format('YYYY-MM-DD');

            for(let i = 0; i < this.bookingHistory.length; i++) {
                if(this.bookingHistory[i].date <= date) {
                    this.filteredHistory.push(this.bookingHistory[i]);
                }
            }

        }

    }

    generate() {

        this.gatheredGroups = false;
        this.filteredHistory = [];
        this.groupSessionsArray = [];
        this.completeArray = [];


        this.filter();
        this.filteredHistory.sort(this.compare);

        this.groupSessions(); //groups bookings together

        console.log(this.groupSessionsArray.length);
        this.createReport();
        console.log(this.groupSessionsArray.length);
    }

    createReport() {

        this.completeArray = [];
        let counter = 0;

        for(let i = 0; i < this.groupSessionsArray.length; i ++) {
            let currentBooking;

            this.bookingService.getRoomBooking(this.groupSessionsArray[i][0].date, this.groupSessionsArray[i][0].level, this.groupSessionsArray[i][0].room)
                .subscribe(
                    data => {
                        // this.currentBookings.push((data as any).results);
                        currentBooking = (data as any).results;
                        i++;

                    },
                    err => console.log(err),
                    () => {
                        let date = currentBooking[0].date;

                        let n = (this.groupSessionsArray[i].length);

                        this.tempArr = [];
                        for(let j = 0; j < n; j++) {
                            // Morning
                            if (currentBooking[0].am_status != 0) {


                                if (this.tempArr.length === 0) {
                                    //date
                                    this.tempArr[0] = currentBooking[0].date;
                                    //level
                                    this.tempArr[1] = currentBooking[0].level;
                                    //room
                                    this.tempArr[2] = currentBooking[0].room;
                                    //session
                                    this.tempArr[3] = "AM";
                                    //6 week
                                    this.tempArr[4] = this.groupSessionsArray[i][0].am_dept;
                                    this.tempArr[5] = this.groupSessionsArray[i][0].am_surg;
                                    //5 week
                                    this.tempArr[6] = this.groupSessionsArray[i][0].am_dept;
                                    this.tempArr[7] = this.groupSessionsArray[i][0].am_surg;
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][0].am_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][0].am_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][0].am_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][0].am_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][0].am_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][0].am_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][0].am_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][0].am_surg;
                                }

                                if (this.groupSessionsArray[i][j].created > moment(date).subtract(42, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(35, 'days').format('DD-MM-YYYY')) {
                                    this.tempArr[4] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[5] = this.groupSessionsArray[i][j].am_surg;
                                    //5 week
                                    this.tempArr[6] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[7] = this.groupSessionsArray[i][j].am_surg;
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][j].am_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].am_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].am_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].am_surg;

                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(34, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(28, 'days').format('DD-MM-YYYY')) {
                                    //5 week
                                    this.tempArr[6] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[7] = this.groupSessionsArray[i][j].am_surg;
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][j].am_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].am_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].am_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].am_surg;
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(27, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(21, 'days').format('DD-MM-YYYY')) {
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][j].am_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].am_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].am_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].am_surg;
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(20, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(14, 'days').format('DD-MM-YYYY')) {
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].am_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].am_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].am_surg;
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(13, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(7, 'days').format('DD-MM-YYYY')) {
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].am_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].am_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].am_surg;
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(6, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(0, 'days').format('DD-MM-YYYY')) {
                                    this.tempArr[14] = currentBooking[0].am_dept;
                                    this.tempArr[15] = currentBooking[0].am_surg;
                                }

                            }
                        }
                        if(this.tempArr.length !== 0) {
                            this.completeArray.push(this.tempArr);
                            this.tempArr = [];
                        }


                        for(let j = 0; j < n; j++) {

                            if(currentBooking[0].pm_status !== 0) {

                                if(this.tempArr.length === 0) {
                                    //date
                                    this.tempArr[0] = this.groupSessionsArray[i][0].date;
                                    //level
                                    this.tempArr[1] = this.groupSessionsArray[i][0].level;
                                    //room
                                    this.tempArr[2] = this.groupSessionsArray[i][0].room;
                                    //session
                                    this.tempArr[3] = "PM";
                                    //6 week
                                    this.tempArr[4] = this.groupSessionsArray[i][0].pm_dept;
                                    this.tempArr[5] = this.groupSessionsArray[i][0].pm_surg;
                                    //5 week
                                    this.tempArr[6] = this.groupSessionsArray[i][0].pm_dept;
                                    this.tempArr[7] = this.groupSessionsArray[i][0].pm_surg;
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][0].pm_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][0].pm_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][0].pm_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][0].pm_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][0].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][0].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][0].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][0].pm_surg;
                                }

                                if(this.groupSessionsArray[i][j].created > moment(date).subtract(42,'days').format('DD-MM-YYYY') &&  this.groupSessionsArray[i][j].created < moment(date).subtract(35,'days').format('DD-MM-YYYY')) {
                                    this.tempArr[4] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[5] = this.groupSessionsArray[i][j].pm_surg;
                                    //5 week
                                    this.tempArr[6] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[7] = this.groupSessionsArray[i][j].pm_surg;
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][j].pm_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].pm_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;

                                } else if(this.groupSessionsArray[i][j].created > moment(date).subtract(34,'days').format('DD-MM-YYYY') &&  this.groupSessionsArray[i][j].created < moment(date).subtract(28,'days').format('DD-MM-YYYY')) {
                                    //5 week
                                    this.tempArr[6] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[7] = this.groupSessionsArray[i][j].pm_surg;
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][j].pm_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].pm_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;
                                } else if(this.groupSessionsArray[i][j].created > moment(date).subtract(27,'days').format('DD-MM-YYYY') &&  this.groupSessionsArray[i][j].created < moment(date).subtract(21,'days').format('DD-MM-YYYY')) {
                                    //4 week
                                    this.tempArr[8] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[9] = this.groupSessionsArray[i][j].pm_surg;
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].pm_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;
                                } else if(this.groupSessionsArray[i][j].created > moment(date).subtract(20,'days').format('DD-MM-YYYY') &&  this.groupSessionsArray[i][j].created < moment(date).subtract(14,'days').format('DD-MM-YYYY')) {
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].pm_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;
                                } else if(this.groupSessionsArray[i][j].created > moment(date).subtract(13,'days').format('DD-MM-YYYY') &&  this.groupSessionsArray[i][j].created < moment(date).subtract(7,'days').format('DD-MM-YYYY')) {
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;
                                } else if(this.groupSessionsArray[i][j].created > moment(date).subtract(6,'days').format('DD-MM-YYYY') &&  this.groupSessionsArray[i][j].created < moment(date).subtract(0,'days').format('DD-MM-YYYY')) {
                                    this.tempArr[14] = currentBooking[0].pm_dept;
                                    this.tempArr[15] = currentBooking[0].pm_surg;
                                }


                            }

                        }

                        if(this.tempArr.length !== 0) {
                            this.completeArray.push(this.tempArr);
                        }


                    })


        }

        console.log(this.completeArray);

    }

    groupSessions() {
        let tempArray = [] as Booking[];

        while(this.filteredHistory.length > 0) {
            if(tempArray.length === 0) {
                tempArray.push(this.filteredHistory.shift());
            } else if(this.isSameSession(tempArray[tempArray.length-1], this.filteredHistory[0])) {
                tempArray.push(this.filteredHistory.shift());
            } else {
                this.groupSessionsArray.push(tempArray);
                tempArray = [];
            }
        }

        this.gatheredGroups = true;



        console.log(this.groupSessionsArray);
    }

    isSameSession(a: Booking, b: Booking) {
        if(a.date !== b.date) {
            return false;
        }
        if(a.level !== b.level) {
            return false;
        }
        if(a.room !== b.room) {
            return false;
        }
        return true;
    }

    compareCreated(a: any, b: any): number {
        if(a.url > b.url) {
            return 1;
        } if(a.url < b.url) {
            return -1;
        }

        return 0;
    }

    compare(a: any, b: any): number {
        if(a.date > b.date) {
            return 1;
        }
        if(a.date < b.date) {
            return -1;
        }
        if(a.level > b.level) {
            return 1;
        }
        if(a.level < b.level) {
            return -1;
        }
        if(a.room > b.room) {
            return 1;
        }
        if(a.room < b.room) {
            return -1;
        }
        if(a.created > b.created) {
            return 1;
        }
        if(a.created < b.created) {
            return -1;
        }
        return 0;
    }
}
