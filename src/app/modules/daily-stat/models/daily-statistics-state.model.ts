import { DailyStat } from '../../../common/models';

export interface IDailyStatisticsState {
  dailyStatsByYear: DailyStat[] | null;
  isLoading: boolean;
  error: any | null;
}

export type Cell = {
  id: number;
  isDay: boolean;
  codeHours?: number;
  date?: string;
  uid?: number;
  yearDayNum?: number;
}