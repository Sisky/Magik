import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {map} from "rxjs/operator/map";
import {Observable} from "rxjs/Observable";
// import { Http, Response, Headers } from '@angular/http';

// import { Observable } from 'rxjs';
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

    private userName = 'admin';
    private authToken = '7j0U5f7r6H7f4j3P3s7x';
    private baseUrl = 'http://localhost:8153/api.rsc';
    private headers = new Headers();

    private date: Date;
    private level: number;
    private room: number;
    private url: string;

    constructor(private http: Http) {
        this.headers.append('Authorization', 'Basic ' + btoa(this.userName + ":" + this.authToken));

        //this.headers.append('Connection', 'Close');


    }



    test(): Observable<Object[]> {
        return this.http.get(`http://localhost:5000/CreateUser?email=12345&password=test`)
            .map((res:Response)=> res.json().value)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getRoomBooking(date: Date, level: number, room: number): Promise<Object[]> {
        this.urlMaker(date, level, room);
        return this.http.get(`${this.baseUrl}/${this.url} `, {headers: this.headers})
            .toPromise()
            .then(response => response.json().value)
            .catch(e => console.log("reject: " + e));


    }

    getLevelBooking(date: Date, level: number): Observable<Object[]> {
        this.urlMaker(date, level, 0);
        return this.http.get(`${this.baseUrl}/${this.url} `, {headers: this.headers})
            .map((res:Response) => res.json().value)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any



            // .toPromise()
            // .then(response => response.json().value)
            // .catch(e => console.log("reject: " + e));


    }

    urlMaker(date: Date, level: number, room: number): void {
        let formattedDate = moment(date).format('YYYY-MM-DD');
        //no room maker
        if (room == 0) {
            this.url = "booking?$filter=date eq '" + formattedDate + "' and level eq '" + level + "'";
        } else {
            this.url = "booking?$filter=date eq '" + formattedDate + "' and level eq '" + level + "' and room eq '" + room + "'";
        }
    }
}








