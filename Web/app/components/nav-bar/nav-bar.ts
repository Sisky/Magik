/**
 * Created by Scott Mackenzie on 28/03/2017.
 */

import {Component} from '@angular/core';
import {AuthService} from "../../services/AuthService";

//declare var __moduleName: string;

@Component({
    selector: 'nav-bar',
   // moduleId:__moduleName,
    templateUrl:'./app/components/nav-bar/nav-bar.html',
    styleUrls:['./app/components/nav-bar/nav-bar.css']
})

export default class NavBarComponent {

    profile: any;

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            if (this.auth.userProfile) {
                this.profile = this.auth.userProfile;
            } else {
                this.auth.getProfile((err, profile) => {
                    this.profile = profile;
                });
            }
        }
    }




}

