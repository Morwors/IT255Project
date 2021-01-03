import {User} from '../models/user.model';
import * as UserActions from '../actions/user.actions';

export type Action = UserActions.All;

const defaultUser = new User(null, 'Guest');

// tslint:disable-next-line:typedef
export function userReducer(state: User = defaultUser, action: Action) {
  switch (action.type) {
    case '[USER] Set':
      return {...state, ...action.payload};
    case '[USER] Login':
      return {...state, ...action.payload, loading: false};
    case '[USER] Register':
      return {...state, ...action.payload, loading: false};
    case '[USER] Get user':
      return {...state, loading: true};
    case '[USER] Authenticated':
      return {...state, ...action.payload, loading: false};
    case '[USER] Not Authenticated':
      return {...state, ...defaultUser, loading: false};
    case '[USER] Logout':
      return {...state, ...defaultUser, loading: false};
    case '[USER] Facebook Login':
      return {...state, loading: true};
    default:
      return state;

  }
}
