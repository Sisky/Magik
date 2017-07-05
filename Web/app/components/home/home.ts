import {Component} from '@angular/core';
import {AuthService} from "../../services/AuthService";





@Component({
  selector: 'home',
  styleUrls: ['app/components/home/home.css'],
  template: `
      
      <div class="panel panel-default profile-area">
        <div class="panel-heading">
          <h3>Profile</h3>
        </div>
        <div class="panel-body">
          <img src="{{profile?.picture}}" class="avatar" alt="avatar">
          <div>
            <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
            <h3 class="nickname">{{ profile?.name}} </h3>
            
            <h3 class="nickname">{{ profile ? profile['http://test.com/roles'] : '' }}</h3>
            
          
            
          </div>
          
          <pre>{{ profile | json }}</pre>
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
                this.profile     = profile;
            });
        }







    }

}
