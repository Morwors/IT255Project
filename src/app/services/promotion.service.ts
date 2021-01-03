import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import axios from 'axios';
import {serverIP} from '../../config/config';
import firebase from 'firebase';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as PromotionAction from '../actions/promotion.actions';
import {first} from 'rxjs/operators';
import {IPromotion, IPromotionList} from '../models/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  promotionData: Observable<IPromotionList>;

  constructor(private store: Store<AppState>) {
    this.promotionData = store.select('promotions');
  }

  async getPromotionsPromise(): Promise<IPromotionList> {
    return this.promotionData.pipe(first()).toPromise();
  }


  // tslint:disable-next-line:typedef
  async getPromotions(venueID) {
    const url = serverIP + '/venues/venuePromotions';
    try {
      const res = await axios.post(url, {
        venueID
      });
      const data = res.data;
      console.log('Promotions: ', data);
      this.store.dispatch(new PromotionAction.AddPromotions(data));
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async clearPromotions() {
    this.store.dispatch(new PromotionAction.ClearPromotions());
  }

  // tslint:disable-next-line:typedef variable-name
  async sendPromotion(venue_id, date_from, date_to, promotion_description) {
    console.log('Sending promotion: ', venue_id, date_from, date_to, promotion_description);
    const url = serverIP + '/venues/sendPromotion';
    try {
      const promotionObj: IPromotion = {
        date_from,
        date_to,
        promotion_description,
        promotion_id: null,
        users: 0,
        venue_id,
      };
      this.store.dispatch(new PromotionAction.AddPromotion(promotionObj));
      const res = await axios.post(url, {venue_id, date_from, date_to, promotion_description});
      console.log('Promotion sent: ', res.data);
    } catch (e) {
      console.log('Error: ', e);
    }

  }


}

