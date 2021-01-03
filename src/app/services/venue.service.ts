import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import axios from 'axios';
import {serverIP} from '../../config/config';
import {IVenue} from '../models/venue.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  venueData: Observable<IVenue>;

  constructor() {
  }

  // tslint:disable-next-line:typedef
  async getVenue(id) {
    const venue = {id};
    const url = serverIP + '/venues/getVenue';
    try {
      const res = await axios.post(url, {
        venue
      });
      const data = res.data;
      console.log('Got venue data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async getStatistics(id) {
    const url = serverIP + '/venues/history';
    try {
      const res = await axios.post(url, {
        venue_id: id
      });
      const data = res.data;
      console.log('Got statistic data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async getUsers(venueID, page) {
    console.log('VenueID: ', venueID);
    const url = serverIP + '/venues/recentUsers';
    try {
      const res = await axios.post(url, {
        venue_id: venueID,
        page,
      });
      const data = res.data;
      console.log('Data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async sendRequest(userID, venueID) {
    try {
      const url = serverIP + '/venues/sendOwnerRequest';
      const res = await axios.post(url, {
        userID,
        venueID
      });
      const data = res.data;
      console.log('Data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

}

