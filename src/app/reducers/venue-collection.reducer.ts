import {IVenueCollection, VenueCollection} from '../models/venue-collection.model';
import * as VenueCollAction from '../actions/venue-collection.actions';
import {Venue} from '../models/venue.model';


export type Action = VenueCollAction.All;
const initialState: IVenueCollection = {
  venues: [],
  page: 1,
  loading: false,
  finished: false,
};


// tslint:disable-next-line:typedef
export function venueCollectionReducer(state: IVenueCollection = initialState, action: Action) {
  switch (action.type) {
    case '[VENUECOL] Add':
      let finished = false;
      if (action.payload.length < 20) {
        finished = true;
      }
      return {...state, finished, page: state.page + 1, venues: state.venues.concat(action.payload)};
    case '[VENUECOL] Clear':
      return {...state, ...initialState};
    default:
      return state;
  }
}
