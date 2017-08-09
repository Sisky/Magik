import { Component, OnInit } from '@angular/core';
import {PermissionService} from "../../services/permission.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

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
