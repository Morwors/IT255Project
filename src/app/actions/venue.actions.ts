import {Action} from '@ngrx/store';
import {IVenue} from '../models/venue.model';

export const SET_VENUE = '[VENUE] Set';
export const REMOVE_VENUE = '[VENUE] Remove';


export class SetVenue implements Action {
  readonly type = SET_VENUE;

  constructor(public payload: IVenue) {
    console.log('Payload is: ', payload);
  }
}

export class RemoveVenue implements Action {
  readonly type = REMOVE_VENUE;

  constructor(public payload: string) {
  }
}

export type All
  = SetVenue
  | RemoveVenue;
