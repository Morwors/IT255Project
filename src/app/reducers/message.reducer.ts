import {IVenue} from '../models/venue.model';
import * as MessageAction from '../actions/message.actions';
import {IMessage, IMessageList} from '../models/message.model';


export type Action = MessageAction.All;
const initialState: IMessageList = {
  messages: [],
  page: 1,
  listener: null,
  lastDoc: null,
};

// tslint:disable-next-line:typedef
export function messageReducer(state: IMessageList = initialState, action: Action) {
  switch (action.type) {
    case '[MESSAGE] Add Message':
      console.log('Getting last id');
      const lastDoc = action.payload[action.payload.length - 1].timestamp;
      console.log('Last id is: ', lastDoc);
      return {
        ...state,
        page: state.page + 1,
        messages: state.messages.concat(action.payload),
        lastDoc
      };
    case '[MESSAGE] Clear':
      return {...state, ...initialState};
    case '[MESSAGE] Set Listener':
      return {...state, listener: action.payload};
    case '[MESSAGE] Single Message':
      const message: IMessage = action.payload;
      console.log('Single message payload: ', message);
      return {
        ...state, messages:
          [message, ...state.messages]
      };
    default:
      return state;
  }
}
