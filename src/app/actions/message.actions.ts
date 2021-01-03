import {Action} from '@ngrx/store';
import {IMessage} from '../models/message.model';


export const ADD_MESSAGE = '[MESSAGE] Add Message';
export const SINGLE_MESSAGE = '[MESSAGE] Single Message';
export const CLEAR_MESSAGES = '[MESSAGE] Clear';
export const SET_LISTENER = '[MESSAGE] Set Listener';


export class AddMessage implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload?: IMessage[]) {
    console.log('Checkin payload is: ', payload);
  }
}

export class SingleMessage implements Action {
  readonly type = SINGLE_MESSAGE;

  constructor(public payload: IMessage) {
    console.log('Checkin payload is: ', payload);
  }
}

export class ClearMessages implements Action {
  readonly type = CLEAR_MESSAGES;

  constructor(public payload?: IMessage) {
    console.log('Checkin payload is: ', payload);
  }
}

export class SetListener implements Action {
  readonly type = SET_LISTENER;

  constructor(public payload?: any) {
    // console.log('Checkin payload is: ', payload);
  }
}

export type All
  = AddMessage | ClearMessages | SingleMessage | SetListener;
