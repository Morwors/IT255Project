import {Component, OnInit} from '@angular/core';
import {faCog, faThumbsUp, faShoppingCart, faUser, faMinus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faCog = faCog;
  faThumbsUp = faThumbsUp;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faMinus = faMinus;

  constructor() {
  }

  ngOnInit(): void {
  }

}
