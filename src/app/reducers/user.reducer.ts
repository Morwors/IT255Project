import {User} from '../models/user.model';
import * as UserActions from '../actions/user.actions';

export type Action = UserActions.All;

const defaultUser = new User(null, 'Guest');

// tslint:disable-next-line:typedef
export function userReducer(state: User = defaultUser, action: Action) {
  switch (action.type) {
    case '[USER] Register':
      return {...state, ...action.payload, loading: false};
    case '[USER] Get user':
      return {...state, loading: true};
    case '[USER] Authenticated':
      return {...state, ...action.payload, loading: false};
    case '[USER] Not Authenticated':
      return {...state, ...defaultUser, loading: false};
    default:
      return state;

  }
}
