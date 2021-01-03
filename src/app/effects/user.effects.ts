import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {User} from '../models/user.model';
import {Observable, of, from} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AppState} from '../app.state';
import {map, switchMap} from 'rxjs/operators';


import * as userActions from '../actions/user.actions';

import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

export type Action = userActions.All;

//  console.log('Switch map started');
//       return LoginHelper.login(payload).then(r => {
//         console.log('Started login in effects');
//         if (r.status === 1) {
//           const user = new User(r.venue.uid, r.venue.username, r.venue.photo);
//           console.log('Returning user: ', user);
//           return new userActions.Authenticated(user);
//         } else {
//           console.log('Returning not logged in user');
//           return new userActions.NotAuthenticated();
//         }
//       }).catch(err => {
//         console.log('Error: ', err);
//         return new userActions.LogError();
//       });

@Injectable()
export class UserEffects {
  constructor(private router: Router, private actions: Actions, private authenticationService: AuthenticationService) {
  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(
    ofType(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    switchMap(payload => this.authenticationService.getCurrentUser()),
    map(authData => {
      if (authData) {
        console.log('User logged in');
        const user = new User(authData.uid, authData.email);
        return new userActions.Authenticated(user);
      } else {
        return new userActions.NotAuthenticated();
      }
    })
  );
  @Effect()
  register: Observable<Action> = this.actions.pipe(
    ofType(userActions.REGISTER),
    map((action: userActions.Register) => action.payload),
    switchMap(payload => {
      return from(this.authenticationService.SignUp(payload).then(r => {
        console.log('Returning: ', r);
        return r;
      }).catch(e => {
        console.log('Error: ', e);
        return null;
      }));
    }),
    map(credential => {
      console.log('Credentials: ', credential);
      const user = new User(credential.username, credential.displayName);
      return new userActions.Authenticated(user);
      //
      // return new userActions.GetUser();
    })
  );
  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(userActions.LOGIN),
    map((action: userActions.Login) => action.payload),
    switchMap(payload => this.authenticationService.LogIn(payload)),
    map(user => {
      if (user) {
        const currentUser = this.authenticationService.getCurrentUser();
        console.log('User: ', user.email);
        const userObj = new User(user.uid, user.email);

        return new userActions.Authenticated(userObj);
        // return new userActions.Authenticated(user);
      } else {
        return new userActions.NotAuthenticated();
      }

      //
      // return new userActions.GetUser();
    })
  );
  @Effect()
  facebookLogin: Observable<Action> = this.actions.pipe(
    ofType(userActions.FACEBOOK_LOGIN),
    map((action: userActions.FacebookLogin) => {
      console.log('Payload');
      return action.payload;
    }),
    switchMap(payload => {
      console.log('Starting in payload');
      return this.authenticationService.FacebookLogin();
    }),
    map(user => {
      if (user) {
        console.log('User: ', user.email);
        const userObj = new User(user.uid, user.email);
        return new userActions.Authenticated(userObj);
      } else {
        return new userActions.NotAuthenticated();
      }

      //
      // return new userActions.GetUser();
    })
  );
  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(userActions.LOGOUT),
    map((action: userActions.Logout) => {
      this.authenticationService.logout();
      return new userActions.NotAuthenticated();
    })
  );


//   getUser: Observable<Action> = this.actions.pipe(ofType(userActions.GetUser)
//     .map((action: userActions.GetUser) => action.payload)
//     .switchMap(payload => {
//       LoginHelper.login(payload).then(r => {
//         if (r.status === 1) {
//           const user = new User(r.venue.uid, r.venue.username, r.venue.photo);
//           return new userActions.Authenticated(user);
//         } else {
//           return new userActions.NotAuthenticated();
//         }
//       });
//     })
//     .catch(err => of(new userActions.LogError()));
// );


}


