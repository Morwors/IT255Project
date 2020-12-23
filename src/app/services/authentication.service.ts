import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */

  // tslint:disable-next-line:typedef
  async SignUp(payload) {
    const {email, password} = payload;
    console.log('email is: ', email, 'Password is: ', password);
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  // tslint:disable-next-line:typedef
  async checkLoginState() {
    return this.angularFireAuth.authState;
  }


}
