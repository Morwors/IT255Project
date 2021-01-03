import * as StatisticsAction from '../actions/statistics.actions';
import {IStatistics, IYearStatistics} from '../models/statistics.model';


export type Action = StatisticsAction.All;


// tslint:disable-next-line:typedef
export function statisticsReducer(state: IStatistics, action: Action) {
  switch (action.type) {
    case '[STATISTICS] Set':
      return {...state, ...action.payload};
    default:
      return state;
  }
}
