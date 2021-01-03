import {IVenue} from '../models/venue.model';
import * as VenueAction from '../actions/venue.actions';


export type Action = VenueAction.All;
const initialState: IVenue = {
  loading: true,
  uid: null,
  username: null,
};


// tslint:disable-next-line:typedef
export function venueReducer(state: IVenue = initialState, action: Action) {
  switch (action.type) {
    case '[VENUE] Set':
      return {...state, ...action.payload, loading: false};
    default:
      return state;
  }
}
