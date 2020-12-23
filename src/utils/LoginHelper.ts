import axios from 'axios';
import {serverIP} from '../config/config';
import {AuthenticationService} from '../app/services/authentication.service';
import {Injectable} from '@angular/core';



export class LoginHelper {
  constructor(private authenticationService: AuthenticationService) {}


  // tslint:disable-next-line:typedef
  async login(payload) {
    const venueID = payload.username;
    const password = payload.password;
    console.log('VenueID: ', venueID, ' password: ', password);
    const url = serverIP + '/login';
    try {
      const res = await axios.post(url, {
        venueID,
        password
      });
      const data = res.data;
      console.log('Got login data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async firebaseLogin(payload) {
    console.log('Payload is: ', payload);
    // return await this.authenticationService.SignUp(payload.username, payload.password);
  }

  // tslint:disable-next-line:typedef
   async checkLoginState() {
    // return await this.authenticationService.checkLoginState();
  }
}

