import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";

var moment = require('moment');
moment().format();

@Injectable()
export class BookingService {

  // private baseUrl = 'http://127.0.0.1:8000/booking/';
  private baseUrl = 'https://young-shore-98037.herokuapp.com/booking/';
  private date: Date;
  private level: number;
  private url: string;

  constructor(private http: Http) {

  }

  getAllRequests() {
    this.url = '?valid=3&ordering=created';

    return this.http.get(`${this.baseUrl}${this.url}`)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }
  getAllHistory() {
      this.url = '?valid=0&ordering=created';

      return this.http.get(`${this.baseUrl}${this.url}`)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getLevelBooking(date: Date, level: number): Observable<Booking[]> {

    let formattedDate = moment(date).format('YYYY-MM-DD');
    this.url = "?date=" + formattedDate + "&level=" + level + "&valid=1";

    return this.http.get(`${this.baseUrl}${this.url}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getRoomBooking(date: Date, level: number, room: number): Observable<Booking[]> {
      let formattedDate = moment(date).format('YYYY-MM-DD');
      this.url = "?date=" + formattedDate + "&level=" + level + "&room=" + room + "&valid=1";

      return this.http.get(`${this.baseUrl}${this.url}`)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getRoomHistoryBooking(date: Date, level: number, room: number ): Observable<Object[]> {
    let formattedDate = moment(date).format('YYYY-MM-DD');
    this.url = "?date=" + formattedDate + "&level=" + level + "&room=" + room + "&valid=0" + "&ordering=created";

    return this.http.get(`${this.baseUrl}${this.url}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getRoomRequestBooking(date: Date, level: number, room: number ): Observable<Object[]> {
    let formattedDate = moment(date).format('YYYY-MM-DD');
    this.url = "?date=" + formattedDate + "&level=" + level + "&room=" + room + "&valid=3" +"&ordering=created";

    return this.http.get(`${this.baseUrl}${this.url}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  postNewBooking(date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, am_status:number, pm_status: number, am_confirmed: number, pm_confirmed: number): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let formattedDate = moment(date).format('YYYY-MM-DD');
    let newDate = moment.utc(new Date()).format('YYYY-MM-DDTHH:mm');

    return this.http.post(this.baseUrl, JSON.stringify({date: formattedDate, level: level, room: room, am_dept: am_dept, am_surg:am_surg, pm_dept: pm_dept, pm_surg: pm_surg, valid: valid, created: newDate, am_status: am_status,pm_status: pm_status, am_confirmed: am_confirmed, pm_confirmed: pm_confirmed}), {
      headers: headers
    });
  }

  updateRoomBooking(url: string ,date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, am_status: number, pm_status: number, am_confirmed: number, pm_confirmed: number): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let formattedDate = moment(date).format('YYYY-MM-DD');
    let newDate = moment.utc(new Date()).format('YYYY-MM-DDTHH:mm');
    return this.http.put(url, JSON.stringify({date: formattedDate, level: level, room: room, am_dept: am_dept, am_surg:am_surg, pm_dept: pm_dept, pm_surg: pm_surg, valid: valid, created: newDate, am_status: am_status, pm_status: pm_status, am_confirmed: am_confirmed, pm_confirmed: pm_confirmed}), {
      headers: headers
    });
  }

  postNewRequest(date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, am_status:number, pm_status:number, am_confirmed: number, pm_confirmed: number): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let formattedDate = moment(date).format('YYYY-MM-DD');
    let newDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    return this.http.post(this.baseUrl, JSON.stringify({date: formattedDate, created: newDate, level: level, room: room, am_dept: am_dept, am_surg:am_surg, pm_dept: pm_dept, pm_surg: pm_surg, valid: valid, am_status: am_status, pm_status: pm_status, am_confirmed: am_confirmed, pm_confirmed: pm_confirmed}), {
      headers: headers
    });
  }

}

export class Booking {

  constructor(
    public url: string,
    public date: Date,
    public level: number,
    public room: number,
    public am_dept: string,
    public am_surg: string,
    public pm_dept: string,
    public pm_surg: string,
    public valid: number,
    public am_status: number,
    public pm_status: number,
    public am_confirmed: number,
    public pm_confirmed: number
  ) {
  }
}
