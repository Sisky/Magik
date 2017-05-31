import {Component} from '@angular/core';
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'home',
  styleUrls: ['app/components/home/home.css'],
  template: `
      <!--<div class="container-fluid">-->
          <!--<div class="row">-->
              <!--<div class="col col-md-1"></div>-->
              <!--<div class="col col-md-10">-->
                <!--<h1>Home Page coming soon....</h1>-->
                <!--{{profile?.nickname}}-->
              <!--</div>-->
              <!--<div class="col col-md-1">-->
              <!--</div>-->
            <!---->
        <!--</div>-->
      <!--</div>-->
      <div class="panel panel-default profile-area">
        <div class="panel-heading">
          <h3>Profile</h3>
        </div>
        <div class="panel-body">
          <img src="{{profile?.picture}}" class="avatar" alt="avatar">
          <div>
            <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
            <h3 class="nickname">{{ profile?.nickname }}</h3>
            <h3>{{ profile?.roles}}</h3>
            <h3>{{profile?.gender}}</h3>
          </div>
          <pre class="full-profile">{{ profile | json }}</pre>
        </div>
      </div>
  `
})
export default class HomeComponent {

    profile: any;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
            });
        }
    }

}
