import * as MenuActions from '../actions/menu.actions';
import {IMenuList} from '../models/menu.model';


export type Action = MenuActions.All;
const initialState: IMenuList = {
  menus: [],
  loaded: false,
  reachedEnd: false
};

// tslint:disable-next-line:typedef
export function menuReducer(state: IMenuList = initialState, action: Action) {
  switch (action.type) {
    case '[MENU] Add Menus':
      return {...state, menus: state.menus.concat(action.payload), loaded: true};
    case '[MENU] Clear Menu':
      return {...state, ...initialState};
    default:
      return state;
  }
}
