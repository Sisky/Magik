import {AuthService} from "../../services/auth.service";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private auth: AuthService) {

  }

  ngOnInit() {

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
