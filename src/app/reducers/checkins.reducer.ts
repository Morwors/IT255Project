import * as CheckinActions from '../actions/checkins.actions';
import {ICheckins} from '../models/checkins.model';
import {IUser} from '../models/user.model';


export type Action = CheckinActions.All;
const initialState: ICheckins = {
  users: [],
  page: 1
};


// tslint:disable-next-line:typedef
export function checkinReducer(state: ICheckins = initialState, action: Action) {
  switch (action.type) {
    case '[CHECKIN] Add User':
      // const newState = state.users.concat(action.payload);
      // console.log('New state: ', newState);
      return {...state, page: state.page + 1, users: state.users.concat(action.payload)};

    default:
      return state;
  }
}
