import {IUser} from './user.model';

export interface IMessage {
  message: string;
  timestamp: number;
  sentBy: string;
  seen?: boolean;
  type?: string;
  id?: string;
  user?: IUser;
}
export interface IMessageList {
  messages: IMessage[];
  page: number;
  listener: any;
  lastDoc: number;
}
