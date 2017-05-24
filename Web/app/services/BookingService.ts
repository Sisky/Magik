import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

declare var moment: any;

export class Booking {

    constructor(
        public date: Date,
        public level: number,
        public room: number,
        public am_dept: string,
        public pm_dept: string,
        public am_surg: string,
        public pm_surg: string,
        ) {

    }
}

// return a Booking object that matches date, room and level
@Injectable()
export class BookingService {

    private baseUrl = 'http://127.0.0.1:8000/booking/';
    private date: Date;
    private level: number;
    private url: string;

    constructor(private http: Http) {

    }

    getLevelBooking(date: Date, level: number): Observable<Object[]> {

        let formattedDate = moment(date).format('YYYY-MM-DD');
        this.url = "?date=" + formattedDate + "&level=" + level + "&valid=1";

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

    postNewBooking(date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, confirmed: number): Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var status;
        if(confirmed == 1){
            status = 2;
        } else {
            status = 1;
        }
        let formattedDate = moment(date).format('YYYY-MM-DD');
        let newDate = moment.utc(new Date()).format('YYYY-MM-DDTHH:mm');

        return this.http.post(this.baseUrl, JSON.stringify({date: formattedDate, level: level, room: room, am_dept: am_dept, am_surg:am_surg, pm_dept: pm_dept, pm_surg: pm_surg, valid: valid, created: newDate, status: status, confirmed: confirmed}), {
            headers: headers
        });
    }

    updateRoomBooking(url: string ,date: Date, level: number, room: number, am_dept: string, am_surg: string, pm_dept: string, pm_surg: string, valid: number, confirmed: number): Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var status;
        if(confirmed == 1){
            status = 2;
        } else {
            status = 1;
        }

        let formattedDate = moment(date).format('YYYY-MM-DD');
        let newDate = moment.utc(new Date()).format('YYYY-MM-DDTHH:mm');
        return this.http.put(url, JSON.stringify({date: formattedDate, level: level, room: room, am_dept: am_dept, am_surg:am_surg, pm_dept: pm_dept, pm_surg: pm_surg, valid: valid, created: newDate, status: status, confirmed: confirmed}), {
            headers: headers
        });
    }

}








