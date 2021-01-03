import {IVenue, Venue} from './venue.model';

export interface IVenueCollection {
  venues: IVenue[];
  page: number;
  loading: boolean;
  finished: boolean;
}

export class VenueCollection {
  constructor(public uid: string, public username: string) {
  }
}
