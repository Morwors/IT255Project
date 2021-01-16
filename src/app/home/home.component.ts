import {Component, OnInit} from '@angular/core';
import {faCog, faMinus, faShoppingCart, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';

import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {IVenue} from '../models/venue.model';


import * as UserAction from '../actions/user.actions';
import * as VenueActions from '../actions/venue.actions';
import * as StatisticsAction from '../actions/statistics.actions';
import * as CheckinAction from '../actions/checkins.actions';
import * as MessageAction from '../actions/message.actions';


import {ActivatedRoute} from '@angular/router';

import {VenueService} from '../services/venue.service';
import {MenuService} from '../services/menu.service';

import {IStatistics} from '../models/statistics.model';
import {ICheckins} from '../models/checkins.model';
import {take} from 'rxjs/operators';
import {IUser, User} from '../models/user.model';
import {IMessageList} from '../models/message.model';
import {MessageService} from '../services/message.service';
import {IMenuList} from '../models/menu.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PhotoModalComponent} from '../photo-modal/photo-modal.component';
import {IPromotionList} from '../models/promotion.model';
import {PromotionService} from '../services/promotion.service';
import {PromotionModalComponent} from '../promotion-modal/promotion-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public id: string;
  faCog = faCog;
  faThumbsUp = faThumbsUp;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faMinus = faMinus;
  public messageText: string;


  venue: Observable<IVenue>;
  statistics: Observable<IStatistics>;
  checkins: Observable<ICheckins>;
  messages: Observable<IMessageList>;
  menu: Observable<IMenuList>;
  userChat: Observable<User>;
  promotions: Observable<IPromotionList>;

  constructor(private route: ActivatedRoute, public menuService: MenuService, private messageService: MessageService,
              private venueService: VenueService,
              private store: Store<AppState>,
              private modalService: NgbModal,
              private promotionService: PromotionService) {
    this.venue = store.select('venue');
    this.statistics = store.select('statistics');
    this.checkins = store.select('checkins');
    this.messages = store.select('messages');
    this.userChat = store.select('user');
    this.menu = store.select('menu');
    this.promotions = store.select('promotions');
  }

  // tslint:disable-next-line:typedef
  openModal(photo, menuID) {
    const modalRef = this.modalService.open(PhotoModalComponent);
    modalRef.componentInstance.photo = photo;
    modalRef.componentInstance.menuID = menuID;
    modalRef.componentInstance.venueID = this.id;
  }

  // tslint:disable-next-line:typedef
  openPromotionModal() {
    const modalRef = this.modalService.open(PromotionModalComponent);
    modalRef.componentInstance.venueID = this.id;
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    await this.loadVenue();
  }

  // tslint:disable-next-line:typedef
  async getPhoto(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    await this.menuService.uploadPhoto(this.id, files[0]);
    await this.menuService.getMenus(this.id);
    // e.target.files = null;
  }

  // tslint:disable-next-line:typedef
  async loadVenue() {
    const statistics = await this.venueService.getStatistics(this.id);
    const venue = await this.venueService.getVenue(this.id);
    await this.loadCheckins();
    await this.menuService.getMenus(this.id);
    await this.promotionService.getPromotions(this.id);
    console.log('Stored menus: ', await this.menuService.getMenuPromise());
    this.store.dispatch(new StatisticsAction.SetStatistics(statistics));
    this.store.dispatch(new VenueActions.SetVenue(venue));
  }

  // tslint:disable-next-line:typedef
  async loadCheckins() {
    let page = 0;
    const sub = this.checkins.pipe(take(1)).subscribe(v => {
      page = v.page;
    });
    const checkins = await this.venueService.getUsers(this.id, page);
    const ICheckinArray = [];
    for (const checkin of checkins) {
      const iUser: IUser = {
        username: checkin.username,
        uid: checkin.uid,
        photo: checkin.photo,
      };
      ICheckinArray.push(iUser);
    }
    this.store.dispatch(new CheckinAction.AddUser(ICheckinArray));


  }

  // tslint:disable-next-line:typedef
  async loadMoreMessages(uidTo) {
    console.log('Loading more messages');
    let page = 1;
    const sub = this.messages.pipe(take(1)).subscribe(v => {
      page = v.page;
    });
    const messages = await this.messageService.getMessages(this.id, uidTo, page);
    if (page === 1) {
      const listener = await this.messageService.messageListener(messages.id, this.id);
      await this.store.dispatch(new MessageAction.SetListener(listener));
    }
    console.log('Got messages: ', messages);
    this.store.dispatch(new MessageAction.AddMessage(messages.messages));
    sub.unsubscribe();
  }

  // tslint:disable-next-line:typedef
  async sendMessage(uidFrom, uidTo) {
    console.log('Message text: ', this.messageText);
    await this.messageService.sendMessage(uidFrom, uidTo, this.messageText, 'text');
    this.messageText = '';
  }

  // tslint:disable-next-line:typedef
  async loadMessages(uidTo, username, photo) {
    const userObj: User = {
      username, uid: uidTo, photo
    };
    console.log('Created user object: ', userObj);
    this.store.dispatch(new UserAction.SetUser(userObj));
    await this.store.dispatch(new MessageAction.ClearMessages());

    await this.loadMoreMessages(uidTo);
  }
}
