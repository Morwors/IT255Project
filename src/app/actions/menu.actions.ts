import {Action} from '@ngrx/store';
import {IMenu} from '../models/menu.model';


export const ADD_MENUS = '[MENU] Add Menus';
export const REMOVE_MENU = '[MENU] Remove Menu';
export const CLEAR_MENU = '[MENU] Clear Menu';

export class AddMenus implements Action {
  readonly type = ADD_MENUS;

  constructor(public payload: IMenu[]) {
  }
}

export class RemoveMenu implements Action {
  readonly type = REMOVE_MENU;

  constructor(public payload: string) {
  }
}

export class ClearMenu implements Action {
  readonly type = CLEAR_MENU;

  constructor(public payload?: string) {
  }
}


export type All
  = AddMenus | RemoveMenu | ClearMenu;
