import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import axios from 'axios';
import {serverIP} from '../../config/config';
import {IVenue} from '../models/venue.model';
import firebase from 'firebase';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as MenuAction from '../actions/menu.actions';
import {IMessageList} from '../models/message.model';
import {first} from 'rxjs/operators';
import {IMenuList} from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuData: Observable<IMenuList>;

  constructor(private store: Store<AppState>) {
    this.menuData = store.select('menu');
  }

  async getMenuPromise(): Promise<IMenuList> {
    return this.menuData.pipe(first()).toPromise();
  }

  // tslint:disable-next-line:typedef
  async clearMenu() {
    this.store.dispatch(new MenuAction.ClearMenu());
  }

  // tslint:disable-next-line:typedef
  async getMenus(venueID) {
    await this.clearMenu();
    const url = serverIP + '/venues/getMenu';
    try {
      const res = await axios.post(url, {
        venueID
      });
      const data = res.data;
      console.log('Venues: ', data);
      this.store.dispatch(new MenuAction.AddMenus(data.menu));
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async deleteMenu(venueId, menuId) {
    console.log('VenueID: ', venueId);
    const url = serverIP + '/venues/deleteMenu';
    try {
      const res = await axios.post(url, {
        venue_id: venueId,
        menu_id: menuId,
      });
      const data = res.data;
      console.log('Deleted menu data: ', data);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async uploadPhoto(venueID, photo) {
    try {
      if (!photo) {
        return;
      }
      const formdata = new FormData();
      formdata.append('photo', photo);
      formdata.append('venueID', venueID || ' ');
      await axios.post(serverIP + '/venues/uploadMenu',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    } catch (e) {
      console.log('Error: ', e);
      return;
    }

  }


}

