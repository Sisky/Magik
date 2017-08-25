import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

import { Injectable } from '@angular/core';
import {Router} from "@angular/router";



declare var auth0: any;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '0ps70T4l4azYesIxFni2njK2R1Nutzt2',
    domain: 'sisky.au.auth0.com',
    responseType: 'token id_token',
    // audience: 'https://sisky.au.auth0.com/userinfo',
    redirectUri: 'https://cryptic-fjord-46997.herokuapp.com/#/callback',
    redirectUri: 'http://localhost:4200/#/callback',
    scope: 'openid profile app_metadata'
  });

  userProfile: any;

  constructor(public router: Router) {}

  public login(): void {
    //clear to stop old tokens creating errors
    localStorage.clear();
    this.auth0.authorize();

  }

  public handleAuthentication(): void {

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['profile']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });

  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.clear();
    // Go back to the home route
    this.router.navigate(['/']);

  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;

  }

  public getProfile(cb): void {

    const accessToken = localStorage.getItem('access_token');

    if (!accessToken)
      throw new Error('Access token must exist to fetch profile');


    this.auth0.client.userInfo(accessToken, (err, profile) => {

      if (profile) {
        this.userProfile = profile;
        localStorage.setItem("profile", JSON.stringify(this.userProfile));
      }
      cb(err, profile);

    });

  }

}
