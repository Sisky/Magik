import {Component} from '@angular/core';

@Component({
  selector: 'auction-home-page',
  styleUrls: ['app/components/home/home.css'],
  template: `
      <h1>Home</h1>
      <h4><a [routerLink]="['/calendar']"> beep </a></h4>
  `
})
export default class HomeComponent {

    constructor() {
    }



}
