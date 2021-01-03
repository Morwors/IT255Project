import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import axios from 'axios';
import {serverIP} from '../../config/config';

import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as RequestAction from '../actions/request.actions';

import {first} from 'rxjs/operators';

import {IRequestList} from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requestData: Observable<IRequestList>;

  constructor(private store: Store<AppState>) {
    this.requestData = store.select('requests');
  }

  async getRequestPromise(): Promise<IRequestList> {
    return this.requestData.pipe(first()).toPromise();
  }

  // tslint:disable-next-line:typedef
  async clearRequest() {
    this.store.dispatch(new RequestAction.ClearRequests());
  }

  // tslint:disable-next-line:typedef
  async getRequests() {
    await this.clearRequest();
    const requests = await this.getRequestPromise();
    const page = requests.page;
    const url = serverIP + '/venues/getOwnerRequests';
    try {
      const res = await axios.post(url, {
        page
      });
      const data = res.data;
      console.log('Requests: ', data);
      this.store.dispatch(new RequestAction.AddRequests(data));
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async setOwner(venueId, userId, requestId, allowed) {
    console.log('VenueID: ', venueId);
    const url = serverIP + '/venues/setOwner';
    try {
      const res = await axios.post(url, {
        venueId,
        userId,
        requestId,
        allowed
      });
      const data = res.data;
      console.log('Owner set data: ', data);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async removeRequest(index) {
    try {
      await this.store.dispatch(new RequestAction.RemoveRequest(index));
    } catch (e) {
      console.log('Error: ', e);
      return;
    }

  }


}

