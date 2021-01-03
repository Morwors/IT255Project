export interface IStatistics {
  statisticsArray: IYearStatistics[];
  todayCount: number;
  todayArr: ITodayArr[];
  todayDate: ITodayDate;
}

export interface IYearStatistics {
  year: number;
  statistics: IMonthlyStatistics;
  sum: number;
}

export interface IMonthlyStatistics {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
  '9': number;
  '10': number;
  '11': number;
  '12': number;
}

export interface ITodayArr {
  timestamp: number;
  user_id: string;
}

export interface ITodayDate {
  day: number;
  month: number;
  year: number;
}
