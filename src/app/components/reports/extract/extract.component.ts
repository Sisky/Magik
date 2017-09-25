import { Component, OnInit } from '@angular/core';
import {Booking, BookingService} from "../../../services/booking.service";
import {IMyDpOptions} from "mydatepicker";
import {DateService} from "../../../services/date.service";
import {pims} from '../../../../data-models'

var moment = require('moment');
moment().format();

var alasql = require('alasql');

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  allBookings: Booking[];
  filteredBookings: Booking[] = [];
  filteredHistory: any[] = [];

  loading: Boolean;
  finished: Boolean;

    private model: string =  null;

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };

  constructor(private bookingService: BookingService, private dateService: DateService) { }

  ngOnInit() {
    this.finished = false;
  }

  generate(date?: any) {
    this.allBookings = [];
    this.filteredBookings = [];
    this.filteredHistory = [];

    this.finished = false;
    this.loading = true;

    if(date){
      this.bookingService.getAllActualHistory()
        .subscribe(data => {
          this.allBookings = (data as any).results;
          console.log(this.allBookings.length);
          this.allBookings.sort(this.compareDate);
          this.filterDates(date);

        },
        err => {
          // Log errors if any
          console.log(err);
        },
        () => {
          //get history
            let counter = 0;
            for(let i = 0; i < this.filteredBookings.length; i++) {
                let tempArr = [];

                this.bookingService.getRoomHistoryBooking(this.filteredBookings[i].date, this.filteredBookings[i].level, this.filteredBookings[i].room)
                    .subscribe(data => {

                            tempArr = (data as any).results;
                            tempArr.sort(this.compareUrl);

                        },
                        err => {
                            // Log errors if any
                            console.log(err);
                        },
                        () => {
                            this.filteredHistory[i] = tempArr;

                            if(counter === this.filteredBookings.length-1) {
                                this.loading = false;
                                this.finished = true;

                                console.log(this.filteredBookings);
                                console.log(this.filteredHistory);

                            }
                            counter++;
                        });
            }
      });
    } else {
      this.bookingService.getAllActualHistory()
        .subscribe(data => {
          this.allBookings = (data as any).results;
          console.log(this.allBookings.length);
          this.allBookings.sort(this.compareDate);
          this.filterDates(date);
        },
        err => {
            // Log errors if any
            console.log(err);
        },
        () => {
            //get history
            //get history
            console.log(this.filteredBookings.length-1);
            let counter = 0;
            for(let i = 0; i < this.filteredBookings.length; i++) {
                let tempArr = [];

                this.bookingService.getRoomHistoryBooking(this.filteredBookings[i].date, this.filteredBookings[i].level, this.filteredBookings[i].room)
                    .subscribe(data => {
                        tempArr = (data as any).results;
                        tempArr.sort(this.compareUrl);
                        console.log(tempArr);

                    },
                    err => {
                        // Log errors if any
                        console.log(err);
                    },
                    () => {
                        this.filteredHistory.push(tempArr);
                        counter++
                        if(counter === this.filteredBookings.length-1) {
                            this.loading = false;
                            this.finished = true;

                        }





                    });
            }
        });
    }
  }

  filterDates(date?: any) {
    let today = moment(this.dateService.getDate()).format('YYYY-MM-DD');
    //filter from until yesterday
    if(date) {
        let startDate = moment(new Date(date.date.year, date.date.month-1, date.date.day)).format('YYYY-MM-DD');
      for(let i = 0; i < this.allBookings.length; i++) {
        if(this.allBookings[i].date >= startDate && this.allBookings[i].date < today) {
          this.filteredBookings.push(this.allBookings[i]);
        }

      }
    } else {
        for(let i = 0; i < this.allBookings.length; i++) {
            if(this.allBookings[i].date < today) {
                this.filteredBookings.push(this.allBookings[i]);
            }

        }
    }

  }

  compareDate(a: any, b: any): number {
      if (a.date > b.date) {
          return 1;
      } else if(a.date < b.date) {
          return -1;
      } else if(a.level > b.level) {
          return 1;
      } else if(a.level < b.level) {
          return -1;
      } else if(a.room > b.room) {
          return 1;
      } else if(a.room < b.room) {
          return -1;
      }
      return 0;
  }
  compareUrl(a: any, b: any): number {
    if (a.url > b.url) {
        return 1;
    } else if(a.url < b.url) {
        return -1;
    }
    return 0;
  }

  daysDifference(a: any, b: any): number {
     let start = moment(a);
     let finish = moment(b);
     return Math.abs(finish.diff(start, 'days'));
  }


  getOriginalService(date: Date, level: number, room: number) {

      let tempArr = [];
      let dept = '';
      let finished = false;

      this.bookingService.getRoomHistoryBooking(date, level, room)
          .subscribe(data => {
                  tempArr = (data as any).results;

              },
              err => {
                  // Log errors if any
                  console.log(err);
              },
              () => {
                  dept = tempArr[0].am_dept;
                  finished = true;
              });

      // return dept;
  }

    pad(num:number): string {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }


  getPIMS(service: string): string {

    return pims[service].service;

  }

  getType(service: string): string {

    return pims[service].type;

  }

  getAge(service: string): string {

    return pims[service].age;
  }

    exportCSV():void {
        let data = alasql('SELECT * FROM HTML("#extract_report",{headers:true})');
        alasql('SELECT * INTO CSV("extract_report.csv",{headers:true}) FROM ?', [data]);
    }
}
