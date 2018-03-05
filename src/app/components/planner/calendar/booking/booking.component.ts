import { DataService } from '../../../../services/data.service';
import { Booking, BookingService } from '../../../../services/booking.service';
import { CalendarComponent } from '../calendar.component';
import { PermissionService } from '../../../../services/permission.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

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
  is_am_shutdown: boolean = false;
  is_pm_shutdown: boolean = false;
  is_am_leave: boolean = false;
  is_pm_leave: boolean = false;

  @Input() url: string;
  @Input() surgAM: string;
  @Input() deptAM: string;
  @Input() deptPM: string;
  @Input() surgPM: string;
  @Input() level: number;
  @Input() date: Date;
  @Input() room: number;
  @Input() am_status: number;
  @Input() pm_status: number;
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

    this.is_am_shutdown = this.am_status == 3;
    this.is_pm_shutdown = this.pm_status == 3;

    this.is_am_leave = this.am_status == 4;
    this.is_pm_leave = this.pm_status == 4;

    const fb = new FormBuilder();

    this.formModel = fb.group({
      f_deptAM: [this.deptAM],
      f_surgAM: [this.surgAM],
      f_deptPM: [this.deptPM],
      f_surgPM: [this.surgPM],
      f_am_confirmed: [this.is_am_confirmed],
      f_pm_confirmed: [this.is_pm_confirmed],
      f_am_shut: [this.is_am_shutdown],
      f_pm_shut: [this.is_pm_shutdown],
      f_am_leave: [this.is_am_leave],
      f_pm_leave: [this.is_pm_leave],

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
          for(const i of this.requestedBookings) {
              if(i.am_status === 5)
                this.requestsAM += 1;
              if(i.pm_status === 5)
                this.requestsPM += 1;
          }
        });

  }

  private saveBooking() {

    if(this.formModel.dirty) {
      // POST original booking
      this.bookingService.postNewBooking(this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 0, 1, 1, 1, 1).subscribe();

      // Update orginal to new
      if (this.formModel.get('f_deptAM').dirty)
          this.deptAM = this.formModel.get('f_deptAM').value;

      if (this.formModel.get('f_deptPM').dirty)
          this.deptPM = this.formModel.get('f_deptPM').value;

      if (this.formModel.get('f_surgAM').dirty)
          this.surgAM = this.formModel.get('f_surgAM').value;

      if (this.formModel.get('f_surgPM').dirty)
          this.surgPM = this.formModel.get('f_surgPM').value;

      if ((this.formModel).get('f_am_confirmed').value) {
          this.am_confirmed = 1;
      } else {
          this.am_confirmed = 0;
      }

      if ((this.formModel).get('f_pm_confirmed').value) {
          this.pm_confirmed = 1;
      } else {
          this.pm_confirmed = 0;
      }
      // If dirty needs to show recycled
      if (this.formModel.get('f_surgAM').dirty || this.formModel.get('f_deptAM').dirty) {
        this.am_status = 1;
      }
      if (this.formModel.get('f_surgPM').dirty || this.formModel.get('f_deptPM').dirty) {
        this.pm_status = 1;
      }

      //Leave
      if ((this.formModel).get('f_am_leave').value) {
          this.am_status = 4;
      } else {
          if(this.am_status == 4) {
              this.am_status = 1;
          }
      }

      if ((this.formModel).get('f_pm_leave').value) {
          this.pm_status = 4;
      } else {
          if(this.pm_status == 4) {
              this.pm_status = 1;
          }
      }

      // Shutdown
      if ((this.formModel).get('f_am_shut').value) {
        this.am_status = 3;
        this.deptAM = 'SHUTDOWN';
        this.surgAM = 'SHUTDOWN';
      } else {
        if(this.am_status == 3) {
          this.am_status = 1;
        }
      }

      if ((this.formModel).get('f_pm_shut').value) {
        this.pm_status = 3;
        this.deptPM = 'SHUTDOWN';
        this.surgPM = 'SHUTDOWN';
      }else {
          if(this.pm_status == 3) {
              this.pm_status = 1;
          }
      }

      this.bookingService.updateRoomBooking(this.url, this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 1, this.am_status, this.pm_status, this.am_confirmed, this.pm_confirmed).subscribe( null,error => console.log('Error: ', error),() =>this.calendar.populate());

    }

  }

  private request() {

    if (this.formModel.get('f_deptAM').dirty || this.formModel.get('f_surgAM').dirty) {
      this.deptAM = this.formModel.get('f_deptAM').value;
      this.surgAM = this.formModel.get('f_surgAM').value;
      this.am_status = 5;
    }

    if (this.formModel.get('f_deptPM').dirty || this.formModel.get('f_surgPM').dirty) {
        this.deptPM = this.formModel.get('f_deptPM').value;
        this.surgPM = this.formModel.get('f_surgPM').value;
      this.pm_status = 5;
    }

    this.bookingService.postNewRequest(this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 3, this.am_status, this.pm_status, 1, 1).subscribe( null,error => console.log('Error: ', error),() =>this.calendar.populate());

  }

  private acceptRequest(url: string, date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, confirmed: number, am_status:number, pm_status: number ) {

      let temp_am_status = am_status;
      let temp_pm_status = pm_status;

      if (temp_am_status === 5) {
          temp_am_status = 1;
      }
      if (temp_pm_status === 5){
          temp_pm_status = 1
      }

    this.bookingService.updateRoomBooking(this.url, this.date, this.level, this.room, this.deptAM, this.surgAM, this.deptPM, this.surgPM, 0, 1, 1, 1, 1).subscribe();
    this.bookingService.updateRoomBooking(url, date, level, room, am_dept, am_surg, pm_dept, pm_surg, 1,temp_am_status, temp_pm_status,  this.am_confirmed, this.pm_confirmed   ).subscribe( null,error => console.log('Error: ', error),() =>this.calendar.populate());

  }

}
