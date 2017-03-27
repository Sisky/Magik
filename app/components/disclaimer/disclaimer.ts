import {Component} from '@angular/core';

@Component({
    selector: 'disclaimer',
    template: `
        <h1>Disclaimer</h1>
        <h4><a [routerLink]="['/']"> beep </a></h4>
    `
})
export default class DisclaimerComponent {

}
