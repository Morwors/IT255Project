import {IUser} from './user.model';

export interface ICheckins {
  users: IUser[];
  page: number;
}
