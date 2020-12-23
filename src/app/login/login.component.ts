import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Observable} from 'rxjs';
import * as userActions from '../actions/user.actions';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  user: Observable<User>;

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.user = this.store.select('user');
    this.store.dispatch(new userActions.GetUser());
  }

  // tslint:disable-next-line:typedef
  async login() {
    console.log('Started login event');
    const payload = {email: this.email, password: this.password};
    this.store.dispatch(new userActions.Login(payload));
    // if (this.user.uid) {
    //
    //   await this.router.navigate(['/home']);
    // }
    // console.log('Username is:', this.username, 'password is:', this.password);
  }


}
