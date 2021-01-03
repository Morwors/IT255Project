import {IUser, User} from './models/user.model';
import {IVenue, Venue} from './models/venue.model';
import {IVenueCollection, VenueCollection} from './models/venue-collection.model';
import {IStatistics} from './models/statistics.model';
import {ICheckins} from './models/checkins.model';
import {IMessageList} from './models/message.model';
import {IMenuList} from './models/menu.model';
import {IPromotionList} from './models/promotion.model';
import {IRequestList} from './models/request.model';

export interface AppState {
  readonly user: User;
  readonly checkins: ICheckins;
  readonly messages: IMessageList;
  readonly venue: IVenue;
  readonly venueCollection: IVenueCollection;
  readonly statistics: IStatistics;
  readonly menu: IMenuList;
  readonly promotions: IPromotionList;
  readonly requests: IRequestList;
}
