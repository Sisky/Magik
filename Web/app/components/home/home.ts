import {Component} from '@angular/core';
import {Booking, BookingService} from "../../services/BookingService";
import {forEach} from "@angular/router/src/utils/collection";
import {isObject} from "rxjs/util/isObject";



@Component({
  selector: 'auction-home-page',
  styleUrls: ['app/components/home/home.css'],
  template: `
      <h1>Home</h1>
      <h4><a [routerLink]="['/calendar']"> beep </a></h4>

      <table>
          <tr>
              <th *ngFor="let column of selectedColumns">{{ column }}</th>
          </tr>
          <tr *ngFor="let r of res">
              <td *ngFor="let column of selectedColumns">{{ r[column] }}</td>
          </tr>
      </table>

      
      
     
        `
})
export default class HomeComponent {

    date: Date;
    res: Object[];
    test: string;
    selectedColumns: string[];


      constructor(private bookingService: BookingService) {

        this.selectedColumns = ["email", "password"];



    this.date = new Date("2017-05-10");
    // this.bookingService.getLevelBooking(this.date, 1)
    //     .then(data => this.res = data);
    this.bookingService.test()
        .subscribe(data => this.res = data,
            err => {
                // Log errors if any
                console.log(err);
            });




    console.log(this.res);






  }




}
