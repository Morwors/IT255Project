import {Component, OnInit} from '@angular/core';
import {faCog, faThumbsUp, faShoppingCart, faUser, faMinus} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {IVenueCollection} from '../models/venue-collection.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {VenueCollectionService} from '../services/venue-collection.service';
import * as VenueCollectionActions from '../actions/venue-collection.actions';
import {IVenue} from '../models/venue.model';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  faCog = faCog;
  faThumbsUp = faThumbsUp;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faMinus = faMinus;

  venueCollection: Observable<IVenueCollection>;

  constructor(private store: Store<AppState>, private venueCollectionService: VenueCollectionService) {

    this.venueCollection = store.select('venueCollection');
  }

  async ngOnInit(): Promise<void> {
    await this.loadVenues();
  }

  // tslint:disable-next-line:typedef
  async loadVenues() {
    let page = 0;
    const sub = this.venueCollection.pipe(take(1)).subscribe(v => {
      page = v.page;
    });
    sub.unsubscribe();
    console.log('Page is: ', page);
    const venues = await this.venueCollectionService.getCollection(page);
    const iVenueArr: IVenue[] = [];
    for (const venue of venues) {
      let location = null;
      if (venue.location) {
        location = venue.location.formattedAddress[0];
      }
      const venueObj: IVenue = {
        username: venue.username,
        uid: venue.uid,
        location,
      };
      iVenueArr.push(venueObj);
      // this.store.dispatch(new VenueCollectionActions.AddVenue({username: venue.username, uid: venue.uid}));
    }
    this.store.dispatch(new VenueCollectionActions.AddVenue(iVenueArr));
  }

}
