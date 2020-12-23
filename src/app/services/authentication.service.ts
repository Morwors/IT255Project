import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;
import {trace} from '@angular/fire/performance';
import {map} from 'rxjs/operators';

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
  async LogIn(payload) {
    const {email, password} = payload;
    console.log('email is: ', email, 'Password is: ', password);
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res.user.email);
        return res.user;
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        return error;
      });
  }

  // tslint:disable-next-line:typedef
  async checkLoginState() {
    return this.angularFireAuth.authState.pipe(
      map(u => !u)).subscribe(isLoggedIn => {
      console.log('Is logged in: ', isLoggedIn);
      return isLoggedIn;
    });
  }

  // tslint:disable-next-line:typedef
  getCurrentUser() {
    return this.userData.pipe(
      map(user => {
        return user;
      })
    );
    // return firebase.auth().currentUser;
    // return this.angularFireAuth.user.subscribe((data => {
    //   console.log('User is: ', data.displayName);
    //   return data;
    // }));
  }


}
