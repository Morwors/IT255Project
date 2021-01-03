import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import axios from 'axios';
import {serverIP} from '../../config/config';
import {Store} from '@ngrx/store';
import * as VenueCollAction from '../actions/venue-collection.actions';
import {AppState} from '../app.state';
import {IVenue} from '../models/venue.model';
import {IVenueCollection} from '../models/venue-collection.model';

@Injectable({
  providedIn: 'root'
})
export class VenueCollectionService {
  venueData: Observable<IVenueCollection>;

  constructor(private store: Store<AppState>, private authenticationService: AuthenticationService) {
  }

  // tslint:disable-next-line:typedef
  async clearVenue() {
    await this.store.dispatch(new VenueCollAction.ClearVenue());
  }

  // tslint:disable-next-line:typedef
  async searchByName(username) {
    try {
      await this.clearVenue();
      const url = serverIP + '/venues/searchVenue';
      const res = await axios.post(url, {
        username,
      });
      const data = res.data;
      console.log('Got collection data: ', data);
      const iVenueArr: IVenue[] = [];
      for (const venue of data) {
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
      this.store.dispatch(new VenueCollAction.AddVenue(iVenueArr));
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async getCollection(page) {
    const uid = await this.authenticationService.getUserUID();
    const url = serverIP + '/venues/getOwnerVenues';
    try {
      const res = await axios.post(url, {
        uid,
        page
      });
      const data = res.data;
      console.log('Got collection data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

}

