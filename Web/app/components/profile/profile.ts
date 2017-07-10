/**
 * Created by sisky on 10/07/17.
 */

import {Component} from "@angular/core";
import {AuthService} from "../../services/AuthService";

@Component({
    selector: 'profile',
    templateUrl: 'app/components/profile/profile.html',

})

export default class ProfileComponent {

    profile: any;

    constructor(private auth: AuthService) {

        if(this.auth.isAuthenticated()) {

            if (this.auth.userProfile) {
                this.profile = this.auth.userProfile;
            } else {
                this.auth.getProfile((err, profile) => {
                    this.profile = profile;
                });
            }

        }else {
            this.auth.login();
        }

    }
}