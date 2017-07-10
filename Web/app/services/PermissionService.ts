import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {AuthService} from "./AuthService";
import {async} from "rxjs/scheduler/async";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PermissionService {

    profile: any;
    permission: string;

    constructor(private auth: AuthService) {
        if (this.auth.isAuthenticated()) {
            if (this.auth.userProfile) {
                this.profile = this.auth.userProfile;
                this.permission = (this.profile ? this.profile['http://test.com/roles'] : '');
            } else {
                this.auth.getProfile((err, profile) => {
                    this.profile = profile;
                    this.permission = (this.profile ? this.profile['http://test.com/roles'] : '');
                });
            }
        }
    }

    //TODO: Have to call twice. haveto work out why
    getPermission(): number {
        if(this.permission == "admin") {
            return 1;
        } else if(this.permission == "guest") {
            return 2;
        }
        return 0;
    }
}