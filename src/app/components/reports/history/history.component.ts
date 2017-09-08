import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone} from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    bookingHistory: Booking[] = [];
    currentBookings: any[][] = [[]];

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
        for(let i of this.bookingHistory) {
            this.bookingService.getRoomBooking(i.date,i.level,i.room)
                .subscribe(
                    data => this.currentBookings.push((data as any).results),
                    err => console.log(err),
                    () => {
                        console.log(this.bookingHistory.length);
                        console.log(this.currentBookings.length);

                    }
                )
        }
    }




}
