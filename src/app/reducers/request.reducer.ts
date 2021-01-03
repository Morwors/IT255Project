import * as RequestAction from '../actions/request.actions';
import {IRequestList} from '../models/request.model';


export type Action = RequestAction.All;
const initialState: IRequestList = {
  loaded: false,
  page: 1,
  requests: []
};

// tslint:disable-next-line:typedef
export function requestReducer(state: IRequestList = initialState, action: Action) {
  switch (action.type) {
    case '[REQUEST] Add Requests':
      return {...state, requests: state.requests.concat(action.payload), page: state.page + 1, loaded: true};
    case '[REQUEST] Clear Request':
      return {...state, ...initialState};
    case '[REQUEST] Remove Request':
      const arr = [...state.requests];
      arr.splice(action.payload, 1);
      return {...state, requests: arr};
    default:
      return state;
  }
}
