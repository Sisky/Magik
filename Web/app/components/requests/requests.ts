import {Component} from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {PermissionService} from "../../services/PermissionService";

@Component({
    selector: 'requests',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col col-md-1"></div>
                <div class="col col-md-10">
                    <h1>Request Page coming soon....</h1>
                  <button (click)="test()">test</button>
                </div>
                <div class="col col-md-1"></div>
            </div>
        </div>
    `
})
export default class RequestsComponent {

    profile: any;
    perm: number;

    constructor(private permission: PermissionService) {

    }

    ngOnInit() {

    }

    test() {
        //double to populate zz
        console.log(this.permission.getPermission());
    }
}