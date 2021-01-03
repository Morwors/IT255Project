import {Action} from '@ngrx/store';
import {IStatistics} from '../models/statistics.model';

export const SET_STATISTICS = '[STATISTICS] Set';


export class SetStatistics implements Action {
  readonly type = SET_STATISTICS;

  constructor(public payload: IStatistics) {
    console.log('Payload is: ', payload);
  }
}


export type All
  = SetStatistics;
