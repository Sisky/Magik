import {Injectable} from "@angular/core";

import {AuthService} from "./AuthService";

@Injectable()
export class PermissionService {

    profile: any;
    permission: string;

    constructor(private auth: AuthService) {

    }

    getPermission(): string {

        return localStorage.getItem("permission");

    }

    public setPermission() {

        if(this.permission === undefined) {

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

        if(this.permission == "admin") {
            localStorage.setItem("permission", "1");
            } else if(this.permission == "guest") {
                localStorage.setItem("permission", "2");
            } else {
                localStorage.setItem("permission", "0");
        }

    }


}