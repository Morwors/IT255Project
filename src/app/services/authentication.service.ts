import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;
import * as UserModel from '../models/user.model';
import {trace} from '@angular/fire/performance';
import {map} from 'rxjs/operators';
import auth = firebase.auth;

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
  async FacebookLogin() {
    console.log('Facebook async login inited');
    return this.angularFireAuth.signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
        return result.user;
      }).catch((error) => {
        console.log('Login error: ', error);
        return null;
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


  getCurrentUser(): Observable<firebase.User> {
    return this.userData.pipe(
      map(user => {
        return user;
      })
    );
  }

  // tslint:disable-next-line:typedef
  getUserUID() {
    return firebase.auth().currentUser.uid;
  }

  // tslint:disable-next-line:typedef
  async logout() {
    await this.angularFireAuth.signOut();
  }

}
