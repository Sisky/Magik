import { Component, OnInit } from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";
import {DateService} from "../../../services/date.service";

var moment = require('moment');
moment().format();
var alasql = require('alasql');

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

    finished: Boolean = false;
    loading: Boolean = false;

    constructor(private bookingService: BookingService, private dateService: DateService) {

    }

    ngOnInit() {

    }

    filter(date?: any) {

        if(date) {
            //Do something
            let from = moment(new Date(date.date.year, date.date.month-1, date.date.day)).format('YYYY-MM-DD');
            let today = moment(new Date()).format('YYYY-MM-DD');

            for(let i = 0; i < this.bookingHistory.length; i++) {
                if(this.bookingHistory[i].date >= from &&  this.bookingHistory[i].date <= today) {
                    this.filteredHistory.push(this.bookingHistory[i]);
                }
            }

        } else {

            let date = moment(new Date()).format('YYYY-MM-DD');

            for(let i = 0; i < this.bookingHistory.length; i++) {
                if(this.bookingHistory[i].date <= date) {
                    this.filteredHistory.push(this.bookingHistory[i]);
                }
            }

        }

    }

    generate(date?: any) {

        this.loading = true;

        this.bookingService.getAllHistoryCreated()
            .subscribe(
                data => {
                    this.bookingHistory = (data as any).results;
                },
                err => {
                    // Log errors if any
                    console.log(err);
                },
                () => {
                    this.gatheredGroups = false;
                    this.filteredHistory = [];
                    this.groupSessionsArray = [];
                    this.completeArray = [];
                    if(date) {
                        this.filter(date);
                    } else {
                        this.filter();
                    }


                    this.filteredHistory.sort(this.compare);

                    this.groupSessions(); //groups bookings together


                    this.createReport();
                    console.log(this.completeArray);
                }
            );



    }


    exportCSV():void {
        let data = alasql('SELECT * FROM HTML("#six_week_report",{headers:true})');
        alasql('SELECT * INTO CSV("six_week_report.csv",{headers:true}) FROM ?', [data]);
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

                        let date = currentBooking[0].date;

                        this.tempArr = [];

                        if (currentBooking[0].am_status !== 0) {
                            for (let j = 0; j < this.groupSessionsArray[i].length; j++) {
                                // Morning

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

                                this.groupSessionsArray[i].sort(this.urlCompare);
                                // original dept
                                this.tempArr[16] = this.groupSessionsArray[i][0].am_dept;
                                this.tempArr[17] = this.groupSessionsArray[i][0].am_surg;


                                if (this.tempArr.length !== 0) {
                                    this.completeArray.push(this.tempArr);
                                }

                        }

                        this.tempArr = [];

                        if (currentBooking[0].pm_status !== 0) {
                            for (let j = 0; j < this.groupSessionsArray[i].length; j++) {

                                if (this.tempArr.length === 0) {
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

                                if (this.groupSessionsArray[i][j].created > moment(date).subtract(42, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(35, 'days').format('DD-MM-YYYY')) {
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

                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(34, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(28, 'days').format('DD-MM-YYYY')) {
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
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(27, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(21, 'days').format('DD-MM-YYYY')) {
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
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(20, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(14, 'days').format('DD-MM-YYYY')) {
                                    //3 week
                                    this.tempArr[10] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[11] = this.groupSessionsArray[i][j].pm_surg;
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(13, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(7, 'days').format('DD-MM-YYYY')) {
                                    //2 week
                                    this.tempArr[12] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[13] = this.groupSessionsArray[i][j].pm_surg;
                                    //1 week
                                    this.tempArr[14] = this.groupSessionsArray[i][j].pm_dept;
                                    this.tempArr[15] = this.groupSessionsArray[i][j].pm_surg;
                                } else if (this.groupSessionsArray[i][j].created > moment(date).subtract(6, 'days').format('DD-MM-YYYY') && this.groupSessionsArray[i][j].created < moment(date).subtract(0, 'days').format('DD-MM-YYYY')) {
                                    this.tempArr[14] = currentBooking[0].pm_dept;
                                    this.tempArr[15] = currentBooking[0].pm_surg;
                                }

                            }

                            this.groupSessionsArray[i].sort(this.urlCompare);
                            // original dept
                            this.tempArr[16] = this.groupSessionsArray[i][0].pm_dept;
                            this.tempArr[17] = this.groupSessionsArray[i][0].pm_surg;

                            if (this.tempArr.length !== 0) {
                                this.completeArray.push(this.tempArr);
                            }
                        }

                    },
                    err => console.log(err),
                    () => {
                        counter++;
                        if(counter === this.groupSessionsArray.length-1) {
                            this.loading = false;
                            this.finished = true;
                        }

                    })
        }
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

    urlCompare(a: any, b: any): number {
        if (a.url > b.url) {
            return 1;
        } else if(a.url < b.url) {
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

    pad(num:number): string {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }
}


