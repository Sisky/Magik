import {Component, Input, OnInit} from '@angular/core';
import {Booking, BookingService} from "../../../../services/booking.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {

    @Input() url: string;
    @Input() surgAM: string;
    @Input() deptAM: string;
    @Input() deptPM: string;
    @Input() surgPM: string;
    @Input() level: number;
    @Input() date: Date;
    @Input() room: number;
    @Input() status: number;
    @Input() am_confirmed: number;
    @Input() pm_confirmed: number;
    @Input() created: Date;


    originalBooking: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
      this.bookingService.getRoomBooking(this.date,this.level,this.room)
          .subscribe(data => {
            this.originalBooking = (data as any).results,
                  err => {
                      // Log errors if any
                      console.log(err);
                  }
          });

  }

}
