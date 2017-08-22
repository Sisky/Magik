import { Component, OnInit } from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  isDataAvailable: boolean = false;
  changedBookings: Booking[] = [];
  currentBookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {

    this.isDataAvailable = false;
    //Get all changes then filter
    this.bookingService.getAllHistory()
        .subscribe(
            data => {
                this.changedBookings = (data as any).results;
            },
            err => {
                console.log(err);
            },
            () => {
                this.getCurrentBookings();
            })
  }

  getCurrentBookings() {

      for(let i  = 0; i < this.changedBookings.length; i++) {
          this.bookingService.getRoomBooking(this.changedBookings[i].date, this.changedBookings[i].level, this.changedBookings[i].room)
              .subscribe(
                  data => this.currentBookings.push((data as any).results),
                  err => console.log(err),
                  () => {
                    // console.log(this.isDataAvailable);
                    if(i == this.changedBookings.length - 1) {
                        this.isDataAvailable = true;
                        console.log(this.currentBookings);
                    }
                  }
              )
      }
  }


}
