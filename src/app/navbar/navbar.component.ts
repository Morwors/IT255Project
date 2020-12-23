import {Component, OnInit} from '@angular/core';
import {faBars, faSearch, faStar, faEnvelope, faUsers, faFile, faExpandArrowsAlt, faThLarge} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';

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

  constructor(private store: Store<AppState>) {
    this.user$ = store.select('user');
    console.log('User is: ', this.user$);

  }

  ngOnInit(): void {
  }

}
