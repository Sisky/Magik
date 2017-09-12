import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone} from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";
import {Observable} from "rxjs/Observable";
import {DateService} from "../../../services/date.service";
import {IMyDpOptions} from "mydatepicker";

var moment = require('moment');
moment().format();

var alasql = require('alasql');

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    bookingHistory: Booking[] = [];
    test: Booking[] = [];

    filteredBookingHistory: Booking[] = [];
    currentBookings: any[] = [];

    finished: boolean = false;
    loading: boolean = false;

    // Initialized to specific date (09.10.2018).
    private model: string =  null;

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };

    constructor(private bookingService: BookingService, private dateService: DateService) {
        let startDate = moment(this.dateService.getTuesday()).subtract(7,'days').format('DD-MM-YYYY');
    }

    ngOnInit(): void {

        // this.bookingService.getAllHistory()
        //     .subscribe(
        //         data => {
        //             this.test = (data as any).results;
        //         },
        //         err => {
        //             // Log errors if any
        //             console.log(err);
        //         },
        //         () => {
        //             this.test.sort(this.compare);
        //             this.removeDuplicates(this.test);
        //         }
        //     );


        this.bookingService.getAllHistory()
            .subscribe(
                data => {
                    this.bookingHistory = (data as any).results;
                },
                err => {
                    // Log errors if any
                    console.log(err);
                },
                () => {
                    this.test.sort(this.compare);
                    this.removeDuplicates(this.test);
                }
            );
    }

    populateCurrent(): void {
        let counter = 0;
        for(let i of this.filteredBookingHistory) {
            this.bookingService.getRoomBooking(i.date,i.level,i.room)
                .subscribe(
                    data => this.currentBookings.push((data as any).results),
                    err => console.log(err),
                    () => {

                        counter++;
                        if(counter === this.filteredBookingHistory.length ) {
                            this.finished = true;
                            this.loading = false;
                            // this.currentBookings.sort(this.compare);
                            // this.filteredBookingHistory.sort(this.compare);
                        }

                    })
        }


    }

    generate(date?: Date): void {

        this.bookingHistory = [];
        this.filteredBookingHistory = [];
        this.finished = false;

        this.bookingService.getAllHistory()
            .subscribe(
                data => {
                    this.bookingHistory = (data as any).results;
                },
                err => {
                    // Log errors if any
                    console.log(err);
                },
                () => {
                    this.bookingHistory.sort(this.compare);
                    this.removeDuplicates(this.bookingHistory);


                    if(date) {
                        //show loading
                        this.loading = true;
                        this.filter(date);
                        if(this.filteredBookingHistory.length === 0) {
                            this.populateCurrent();
                            this.finished = true;
                            this.loading = false;
                        } else {
                            this.populateCurrent();

                        }

                    } else {
                        //show loading
                        this.loading = true;
                        this.filter();
                        if(this.filteredBookingHistory.length === 0) {
                            this.populateCurrent();
                            this.finished = true;
                            this.loading = false;
                        } else {
                            this.populateCurrent();
                        }
                    }
                }
            );



    }

    filter(date?: any): void {

        if(date) {
            //date to check from
            let startDate = moment(new Date(date.date.year, date.date.month-1, date.date.day)).format('YYYY-MM-DD');

            for (let i = 0; i < this.bookingHistory.length; i++) {
                if (this.bookingHistory[i].created >= startDate) {
                    this.filteredBookingHistory.push(this.bookingHistory[i]);
                }
            }

        } else {
            let all = moment(this.dateService.getDate()).format('YYYY-MM-DD');

            for (let i = 0; i < this.bookingHistory.length; i++) {
                if (this.bookingHistory[i].date >= all) {
                    this.filteredBookingHistory.push(this.bookingHistory[i]);
                }
            }
        }
    }

    exportCSV():void {
        let data = alasql('SELECT * FROM HTML("#history_report",{headers:true})');
        alasql('SELECT * INTO CSV("history_report.csv",{headers:true}) FROM ?', [data]);
    }

    compare(a: any, b: any) {

        let comparison = 0;

        if(a.date > b.date) {
            comparison = 1;
        }
        else if(a.level > b.level) {
            comparison = 1;
        } else if(a.room > b.room) {
            comparison = 1;
        } else if(a.created > b.created) {
            comparison = 1;
        } else {
            comparison = -1;
        }

        return comparison;
    }

    removeDuplicates(arr: any) {

        for(let i = arr.length-1; i > 0; i--) {
            console.log(i);
            console.log(arr[i-1].date);


            if(arr[i].date == arr[i-1].date && arr[i].level == arr[i-1].level && arr[i].room == arr[i-1].room) {
                arr.pop()
            }

        }

        return arr;
    }


    //if level <




}

