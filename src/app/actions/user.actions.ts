import {Action} from '@ngrx/store';

export const SET_USER = '[USER] Set';
export const GET_USER = '[USER] Get user';
export const AUTHENTICATED = '[USER] Authenticated';
export const NOT_AUTHENTICATED = '[USER] Not Authenticated';
export const REGISTER = '[USER] Register';
export const LOGIN = '[USER] Login';
export const LOGOUT = '[USER] Logout';
export const LOG_ERROR = '[USER] Log Error';
export const FACEBOOK_LOGIN = '[USER] Facebook Login';

export const GET_CHECKINS = '[USER] Get Checkins';

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload?: any) {
    console.log('Sending user payload: ', payload);

  }
}

export class GetUser implements Action {
  readonly type = GET_USER;

  constructor(public payload?: any) {
    console.log('Sending user payload: ', payload);

  }
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;

  constructor(public payload?: any) {

  }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;

  constructor(public payload?: any) {

  }
}

export class LogError implements Action {
  readonly type = LOG_ERROR;

  constructor(public payload?: any) {

  }
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload?: any) {

  }
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload?: any) {

  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload?: any) {

  }

}

export class FacebookLogin implements Action {
  readonly type = FACEBOOK_LOGIN;

  constructor(public payload?: any) {

  }

}

export class GetCheckins implements Action {
  readonly type = GET_CHECKINS;

  constructor(public payload?: any) {
    console.log('Sending user payload: ', payload);

  }
}

export type All
  = SetUser
  | GetUser
  | Authenticated
  | NotAuthenticated
  | LogError
  | Register
  | Login
  | Logout
  | FacebookLogin
  | GetCheckins;

