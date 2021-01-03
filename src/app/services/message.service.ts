import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import axios from 'axios';
import {serverIP} from '../../config/config';
import {IVenue} from '../models/venue.model';
import firebase from 'firebase';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import * as MessageAction from '../actions/message.actions';
import {IMessageList} from '../models/message.model';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  venueData: Observable<IVenue>;
  chatData: Observable<IMessageList>;

  constructor(private store: Store<AppState>) {
    this.chatData = store.select('messages');
  }

  async getChat(): Promise<IMessageList> {
    return this.chatData.pipe(first()).toPromise();
  }


  // tslint:disable-next-line:typedef
  async getMessages(uidFrom, uidTo, page) {
    console.log('uid_from: ', uidFrom, ' uid_to: ', uidTo);
    const chat = await this.getChat();
    const url = serverIP + '/chat/getMessages';
    try {
      const res = await axios.post(url, {
        uid_from: uidFrom,
        uid_to: uidTo,
        lastDoc: chat.lastDoc
      });
      const data = res.data;
      console.log('Messages: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async sendMessage(uidFrom, uidTo, message, type) {
    const formdata: any = new FormData();
    if (type === 'img') {
      formdata.append('message', {
        name: '',
        type: 'image/jpeg',
        uri: message
      });
    } else {
      formdata.append('message', message || '');
    }
    const userFromJSON = JSON.stringify({uid: uidFrom});
    const userToJSON = JSON.stringify({uid: uidTo});
    console.log('Sending message to: ', uidTo, ' from:', uidFrom);
    formdata.append('type', type || 'text');
    formdata.append('user_from', userFromJSON || '');
    formdata.append('user_to', userToJSON || '');
    formdata.append('timestamp', Date.now());
    const url = serverIP + '/chat/sendMessage';
    try {
      const res = await axios.post(url, formdata);
      const data = res.data;
      console.log('Message: ', data);
      if (data) {
        this.store.dispatch(new MessageAction.SingleMessage(data));
        return data;
      } else {
        return null;
      }

    } catch (e) {
      console.log('Error: ', e);
    }
  }

  // tslint:disable-next-line:typedef
  async messageListener(chatID, venueID) {
    try {
      let inited = false;
      console.log('Chat id is: ', chatID);
      return await firebase.firestore().collection('chatMessages').doc(chatID).onSnapshot(res => {
        if (inited) {
          const newData = res.data();
          if (venueID !== newData.last_message.sentBy) {
            console.log('New message is: ', newData.last_message);
            this.store.dispatch(new MessageAction.SingleMessage(newData.last_message));
            // return newData.last_message;
          }
        } else {
          inited = true;
        }

      });
    } catch (e) {
      console.log('Getting new messages error!');
    }
  }

}

