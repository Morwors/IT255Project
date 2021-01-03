import {Action} from '@ngrx/store';
import {IPromotion} from '../models/promotion.model';


export const ADD_PROMOTIONS = '[PROMOTION] Add Promotions';
export const ADD_PROMOTION = '[PROMOTION] Add Promotion';
export const CLEAR_PROMOTIONS = '[PROMOTION] Clear Promotions';

export class AddPromotions implements Action {
  readonly type = ADD_PROMOTIONS;

  constructor(public payload?: IPromotion[]) {
    console.log('Checkin payload is: ', payload);
  }
}

export class AddPromotion implements Action {
  readonly type = ADD_PROMOTION;

  constructor(public payload?: IPromotion) {
    console.log('Checkin payload is: ', payload);
  }
}

export class ClearPromotions implements Action {
  readonly type = CLEAR_PROMOTIONS;

  constructor(public payload?: string) {
    console.log('Checkin payload is: ', payload);
  }
}

export type All
  = AddPromotions | AddPromotion | ClearPromotions;
