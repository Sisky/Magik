import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone} from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";
import {Observable} from "rxjs/Observable";
import {DateService} from "../../../services/date.service";

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
    filteredBookingHistory: Booking[] = [];
    currentBookings: any[] = [];

    finished: boolean = false;
    startDate: Date;

    constructor(private bookingService: BookingService, private dateService: DateService) {

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

                        }

                    }
                )
        }

    }


    generate(): void {
        this.filter();

        this.populateCurrent();

    }

    filter(): void {
        let date =  moment(this.dateService.getDate()).format('YYYY-MM-DD');

        for(let i = 0; i < this.bookingHistory.length; i++) {
            if(this.bookingHistory[i].date >= date) {
                this.filteredBookingHistory.push(this.bookingHistory[i]);
            }
        }
    }




    exportCSV():void {
        let data = alasql('SELECT * FROM HTML("#history_report",{headers:true})');
        alasql('SELECT * INTO CSV("history_report.csv",{headers:true}) FROM ?', [data]);
    }




}

