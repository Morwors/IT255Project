import {Action} from '@ngrx/store';
import {IVenueCollection, VenueCollection} from '../models/venue-collection.model';
import {IVenue} from '../models/venue.model';

export const ADD_VENUE = '[VENUECOL] Add';
export const REMOVE_VENUE = '[VENUECOL] Remove';
export const CLEAR_VENUE = '[VENUECOL] Clear';


export class AddVenue implements Action {
  readonly type = ADD_VENUE;

  constructor(public payload?: IVenue[]) {
    console.log('Payload is: ', payload);
  }
}

export class RemoveVenue implements Action {
  readonly type = REMOVE_VENUE;

  constructor(public payload: string) {
  }
}

export class ClearVenue implements Action {
  readonly type = CLEAR_VENUE;

  constructor(public payload?: string) {
  }
}


export type All
  = AddVenue
  | RemoveVenue
  | ClearVenue;
