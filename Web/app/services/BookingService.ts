import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
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
        this.urlMaker(date, level);
        return this.http.get(`${this.baseUrl}${this.url}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    urlMaker(date: Date, level: number): void {
        let formattedDate = moment(date).format('YYYY-MM-DD');
        this.url = "?date=" + formattedDate + "&level=" + level;
    }
}








