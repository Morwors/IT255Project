import {IRequest} from '../models/request.model';
import {Action} from '@ngrx/store';

export const ADD_REQUESTS = '[REQUEST] Add Requests';
export const REMOVE_REQUEST = '[REQUEST] Remove Request';
export const ADD_REQUEST = '[REQUEST] Add Request';
export const CLEAR_REQUEST = '[REQUEST] Clear Request';

export class AddRequests implements Action {
  readonly type = ADD_REQUESTS;

  constructor(public payload: IRequest[]) {
    console.log('Payload: ', payload);
  }
}

export class RemoveRequest implements Action {
  readonly type = REMOVE_REQUEST;

  constructor(public payload: number) {
  }
}

export class AddRequest implements Action {
  readonly type = ADD_REQUEST;

  constructor(public payload: IRequest) {
  }
}

export class ClearRequests implements Action {
  readonly type = CLEAR_REQUEST;

  constructor(public payload?: string) {
  }
}


export type All
  = AddRequests | RemoveRequest | AddRequest | ClearRequests;
