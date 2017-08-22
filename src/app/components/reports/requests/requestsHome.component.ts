import { Component, OnInit } from '@angular/core';
import {PermissionService} from "../../../services/permission.service";
import {Booking, BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requestsHome.component.html',
  styleUrls: ['./requestsHome.component.css']
})
export class RequestsComponent implements OnInit {

    requestedBookings: Booking[] = [];

  constructor(private bookingService: BookingService) {

  }

  ngOnInit() {
      this.bookingService.getAllRequests()
          .subscribe(data => this.requestedBookings = (data as any).results,
              err => {
                  // Log errors if any
                  console.log(err);
              });
  }



}
