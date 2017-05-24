import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PermissionService {
    //1 = admin/full access
    permission: number;

    constructor() {
        this.permission = 1; //Testing as admin
    }
    getPermission(): number {
        return this.permission;
    }
    setLevel(permission: number) {
        this.permission = permission;
    }

}