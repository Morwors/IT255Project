import * as PromotionAction from '../actions/promotion.actions';
import {ICheckins} from '../models/checkins.model';
import {IUser} from '../models/user.model';
import {IPromotionList} from '../models/promotion.model';


export type Action = PromotionAction.All;
const initialState: IPromotionList = {
  promotions: [],
  page: 1,
};


// tslint:disable-next-line:typedef
export function promotionReducer(state: IPromotionList = initialState, action: Action) {
  switch (action.type) {
    case '[PROMOTION] Add Promotions':
      return {...state, page: state.page + 1, promotions: state.promotions.concat(action.payload)};
    case '[PROMOTION] Add Promotion':
      return {
        ...state, promotions:
          [action.payload, ...state.promotions]
      };
    case '[PROMOTION] Clear Promotions':
      return {...state, ...initialState};
    default:
      return state;
  }
}
