import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/AuthService";


declare var __moduleName: string;
@Component({
    selector: 'app',
    moduleId:__moduleName,
    templateUrl: './application.html',
    styleUrls: ['./application.css'],
    encapsulation:ViewEncapsulation.None
})

export default class ApplicationComponent {

    constructor(public authService: AuthService) {
        authService.handleAuthentication();
    }
}
