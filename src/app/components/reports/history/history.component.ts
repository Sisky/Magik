import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone} from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";
import {Observable} from "rxjs/Observable";

var alasql = require('alasql');

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    bookingHistory: Booking[] = [];
    currentBookings: any[] = [];
    finished: boolean = false;
    hello: string = 'world';

    constructor(private bookingService: BookingService) {}

    ngOnInit(): void {
        console.log('test' + this.currentBookings.length);

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
                    this.populateCurrent()

                }

            );

    }

    populateCurrent(): void {
        let counter = 0;
        for(let i of this.bookingHistory) {
            this.bookingService.getRoomBooking(i.date,i.level,i.room)
                .subscribe(
                    data => this.currentBookings.push((data as any).results),
                    err => console.log(err),
                    () => {
                        counter++;
                        if(counter === this.bookingHistory.length ) {
                            this.finished = true;
                        }

                    }
                )
        }

    }

    exportCSV():void {
        let data = alasql('SELECT * FROM HTML("#history_report",{headers:true})');
        alasql('SELECT * INTO CSV("history_report.csv",{headers:true}) FROM ?', [data]);
    }




}
