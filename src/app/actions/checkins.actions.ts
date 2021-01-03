import {Action} from '@ngrx/store';
import {IUser} from '../models/user.model';


export const ADD_USER = '[CHECKIN] Add User';


export class AddUser implements Action {
  readonly type = ADD_USER;

  constructor(public payload?: IUser[]) {
    console.log('Checkin payload is: ', payload);
  }
}


export type All
  = AddUser;
