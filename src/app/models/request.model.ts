import {IUser} from './user.model';
import {IVenue} from './venue.model';

export interface IRequestList {
  requests: IRequest[];
  page: number;
  loaded: boolean;
}

export interface IRequest {
  user: IUser;
  venue: IVenue;
  id: string;
  completed: boolean;
  allowed: boolean;
  timestamp: number;
}
