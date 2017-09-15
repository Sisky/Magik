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

                }
            );
    }

    populateCurrent(): void {
        for(let i = 0; i < this.filteredBookingHistory.length; i++) {
            this.currentBookings[i] = [];
        }

        let counter = 0;


        for(let i = 0; i < this.filteredBookingHistory.length; i++) {
            this.bookingService.getRoomBooking(this.filteredBookingHistory[i].date, this.filteredBookingHistory[i].level, this.filteredBookingHistory[i].room)
                .subscribe(
                    data => {
                        // this.currentBookings.push((data as any).results);
                        this.currentBookings[i] = (data as any).results;

                    },
                    err => console.log(err),
                    () => {

                        counter++;
                        if(counter === this.filteredBookingHistory.length ) {
                            this.finished = true;
                            this.loading = false;

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
                    //sort in to
                    this.bookingHistory.sort(this.compare);
                    this.filteredBookingHistory = this.removeDuplicates(this.bookingHistory);


                    if(date) {
                        //show loading
                        this.loading = true;
                        this.filteredBookingHistory = this.filter(date);
                        if(this.filteredBookingHistory.length === 0) {
                            this.populateCurrent();

                            this.finished = true;
                            this.loading = false;
                        } else {
                            this.populateCurrent();
                            console.log(this.filteredBookingHistory);
                            console.log(this.currentBookings);

                        }

                    } else {
                        //show loading
                        this.loading = true;
                        this.filteredBookingHistory = this.filter();
                        if(this.filteredBookingHistory.length === 0) {
                            this.populateCurrent();
                            console.log(this.filteredBookingHistory);
                            console.log(this.currentBookings);

                            this.finished = true;
                            this.loading = false;
                        } else {
                            this.populateCurrent();
                            console.log(this.filteredBookingHistory);
                            console.log(this.currentBookings);
                        }
                     }
                }
            );



    }

    filter(date?: any) {
        let tempBooking = [];

        if(date) {
            //date to check from
            let startDate = moment(new Date(date.date.year, date.date.month-1, date.date.day)).format('YYYY-MM-DD');

            for (let i = 0; i < this.filteredBookingHistory.length; i++) {
                if (this.filteredBookingHistory[i].created >= startDate) {
                    tempBooking.push(this.filteredBookingHistory[i]);
                }
            }
        } else {
            let all = moment(this.dateService.getDate()).format('YYYY-MM-DD');

            for (let i = 0; i < this.filteredBookingHistory.length; i++) {
                if (this.filteredBookingHistory[i].date >= all) {
                    tempBooking.push(this.filteredBookingHistory[i]);
                }
            }
        }

        return tempBooking;
    }

    exportCSV():void {
        let data = alasql('SELECT * FROM HTML("#history_report",{headers:true})');
        alasql('SELECT * INTO CSV("history_report.csv",{headers:true}) FROM ?', [data]);
    }

    compare(a: any, b: any) {

        let comparison = 0;

        if(a.created > b.created) {
            comparison = -1;
        } else {
            comparison = 1;
        }

        return comparison;
    }

    removeDuplicates(arr: any) {

        let uniqueArr = [];

        for(let i = 0; i < arr.length; i++) {
            let unique = true;
            for(let j = 0; j < uniqueArr.length; j++) {
                if(uniqueArr[j].date === arr[i].date && uniqueArr[j].level === arr[i].level && uniqueArr[j].room === arr[i].room) {
                    unique = false;
                }
            }
            if (unique) {
                uniqueArr.push(arr[i]);
            }

        }

        return uniqueArr;
    }




    //if level <




}

