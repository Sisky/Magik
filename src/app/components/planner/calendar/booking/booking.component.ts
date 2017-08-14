import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {Booking, BookingService} from "../../../../services/booking.service";
import {CalendarComponent} from "../calendar.component";
import {PermissionService} from "../../../../services/permission.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  formModel: FormGroup;
  permission: number;
  surgeons: String[];
  services: String[];
  requestsAM: number;
  requestsPM: number;
  is_am_confirmed: boolean;
  is_pm_confirmed: boolean;

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

  changedBookings: Object[];
  requestedBookings: Booking[] = [];

  constructor(
    private dataService: DataService,
    private bookingService: BookingService,
    private calendar: CalendarComponent,
    private permissionService: PermissionService) {
  }

  ngOnInit() {

    this.is_am_confirmed = this.am_confirmed == 1;
    this.is_pm_confirmed = this.pm_confirmed == 1;

    const fb = new FormBuilder();

    this.formModel = fb.group({
      'f_deptAM': [this.deptAM],
      'f_surgAM': [this.surgAM],
      'f_deptPM': [this.deptPM],
      'f_surgPM': [this.surgPM],
      'f_am_confirmed': [this.is_am_confirmed],
      'f_pm_confirmed': [this.is_pm_confirmed]
    });

    this.permission = Number(this.permissionService.getPermission());

    this.getRequestLog();

  }

  private populateDropDowns() {

    this.surgeons = this.dataService.getSurgeons();
    this.services = this.dataService.getServices();

  }

  private getChangeLog() {

    this.bookingService.getRoomHistoryBooking(this.date,this.level,this.room)
      .subscribe(data => this.changedBookings = (data as any).results,
        err => {
          // Log errors if any
          console.log(err);
        });

  }

  private getRequestLog() {

    this.requestsAM = 0;
    this.requestsPM = 0;

    this.bookingService.getRoomRequestBooking(this.date, this.level, this.room)
      .subscribe(
        data => this.requestedBookings = (data as any).results,
        err => {
          console.log(err);
        },
        () => {

          for(let i of this.requestedBookings) {
            if(i.status === 4)
              this.requestsAM += 1;
            if(i.status === 5)
                this.requestsPM += 1;
            if(i.status === 6) {
                this.requestsAM += 1;
                this.requestsPM += 1;
            }
          }

        });

  }

  private saveBooking() {

    if(this.formModel.dirty) {
      // POST original booking
      this.bookingService.postNewBooking(this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 0, 1, 1, 1).subscribe();

      // Update orginal to new
      if(this.formModel.get("f_deptAM").dirty)
        this.deptAM = this.formModel.get("f_deptAM").value;

      if(this.formModel.get("f_deptPM").dirty)
        this.deptPM = this.formModel.get("f_deptPM").value;

      if(this.formModel.get("f_surgAM").dirty)
        this.surgAM = this.formModel.get("f_surgAM").value;

      if(this.formModel.get("f_surgPM").dirty)
        this.surgPM = this.formModel.get("f_surgPM").value;

      if((this.formModel).get("f_am_confirmed").value) {
        this.am_confirmed = 1;
      } else {
        this.am_confirmed = 0;
      }

      if((this.formModel).get("f_pm_confirmed").value) {
        this.pm_confirmed = 1;
      } else {
        this.pm_confirmed = 0;
      }

      if(this.formModel.get("f_surgAM").dirty || this.formModel.get("f_deptAM").dirty) {
        this.status = 1;
      }
      if(this.formModel.get("f_surgPM").dirty || this.formModel.get("f_deptPM").dirty) {
        if(this.status == 1) {
          this.status = 3;
        } else {
          this.status = 2;
        }
      }

      this.bookingService.updateRoomBooking(this.url, this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 1, this.status, this.am_confirmed, this.pm_confirmed).subscribe( null,error => console.log("Error: ", error),() =>this.calendar.populate());

    }

  }

  private request() {
    // 4 = morning only request. 5 = afternoon only request. 6 = full day request
    let temp_status = 0;

    if(this.formModel.get("f_deptAM").dirty) {
        this.deptAM = this.formModel.get("f_deptAM").value;
        temp_status = 4;
    }
    if(this.formModel.get("f_surgAM").dirty) {
        this.surgAM = this.formModel.get("f_surgAM").value;
        temp_status = 4;
    }

    if(this.formModel.get("f_deptPM").dirty) {
        this.deptPM = this.formModel.get("f_deptPM").value;
        if(temp_status === 4) {
          temp_status = 6;
        } else {
          temp_status = 5;
        }
    }

    if(this.formModel.get("f_surgPM").dirty) {
        this.surgPM = this.formModel.get("f_surgPM").value;
        if(temp_status === 4) {
            temp_status = 6;
        } else {
            temp_status = 5;
        }
    }

    this.bookingService.postNewRequest(this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 3, temp_status, 1, 1).subscribe( null,error => console.log("Error: ", error),() =>this.calendar.populate());

  }

  private acceptRequest(url: string, date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, confirmed: number ) {

    this.bookingService.updateRoomBooking(this.url, this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 0, 1, 1, 1).subscribe();
    this.bookingService.updateRoomBooking(url, date, level, room, am_dept, am_surg, pm_dept, pm_surg, 1,3, this.am_confirmed, this.pm_confirmed   ).subscribe( null,error => console.log("Error: ", error),() =>this.calendar.populate());

  }

}
