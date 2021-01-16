import {Component, OnInit} from '@angular/core';
import {faBars, faSearch, faStar, faEnvelope, faUsers, faFile, faExpandArrowsAlt, faThLarge} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as userActions from '../actions/user.actions';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faSearch = faSearch;
  faStar = faStar;
  faEnvelope = faEnvelope;
  faUsers = faUsers;
  faFile = faFile;
  faExpandArrowsAlt = faExpandArrowsAlt;
  faThLarge = faThLarge;

  user$: Observable<User>;

  constructor(private store: Store<AppState>, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select('user');
    this.store.dispatch(new userActions.GetUser());
    // this.store.dispatch(new userActions.Logout());
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
