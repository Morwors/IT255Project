export interface IVenue {
  username: string;
  uid: string;
  photo?: string;
  location?: any;
  timestamp?: number;
  error?: string;
  loading?: boolean;
}
export class Venue {
  constructor(public uid: string, public username: string) {}
}
