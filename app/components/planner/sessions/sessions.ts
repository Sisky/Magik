/**
 * Created by Scott Mackenzie on 16/03/17.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'sessions',
    templateUrl: 'app/components/planner/sessions/sessions.html',
    styleUrls: ['app/components/planner/sessions/sessions.css']
})

export default class SessionsComponent {
    sessionID: string;

    constructor() {
        this.sessionID = 'beep';
    }

}