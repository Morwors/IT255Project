export interface IUser {
  username: string;
  uid: string;
  photo?: string;
  location?: any;
  timestamp?: number;
  error?: string;
  loading?: boolean;
}

export class User {
  constructor(public uid: string, public username: string) {}

}
