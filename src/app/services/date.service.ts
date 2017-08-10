import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

var moment = require('moment');
moment().format();

@Injectable()
export class DateService {

  date: Date;
  private dateChange = new Subject<any>();
  dateChange$ = this.dateChange.asObservable();

  constructor() {
    this.date = new Date();
  }

  setDate(date: Date) {
    this.date = date;
    this.dateChange.next(this.date);
  }

  getDate(): Date {
    return new Date();
  }

  getMonday(): Date {
    let monday = moment(this.date).startOf('isoweek').format('YYYY, MM, DD');
    return new Date(monday);
  }

  getTuesday(): Date {
    let tuesday = moment(this.date).startOf('isoweek').add(1, 'days').format('YYYY-MM-DD');
    return new Date(tuesday);
  }

  getWednesday(): Date {
    let wednesday = moment(this.date).startOf('isoweek').add(2, 'days').format('YYYY-MM-DD');
    return new Date(wednesday);
  }

  getThursday() {
    let thursday = moment(this.date).startOf('isoweek').add(3, 'days').format('YYYY-MM-DD');
    return new Date(thursday);
  }

  getFriday() {
    let friday = moment(this.date).startOf('isoweek').add(4, 'days').format('YYYY-MM-DD');
    console.log(friday);
    return new Date(friday);
  }

}
