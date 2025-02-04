import { DailyStat } from '../../../common/models';

export interface IDailyStatisticsState {
  dailyStatsByYear: DailyStat[] | null;
  isLoading: boolean;
  error: any | null;
  isAddNewLoading: boolean;
  isAddNewError: any | null;
}

export type Cell = {
  id?: number;
  isDay: boolean;
  rowHours?: number;
  codeHours?: number;
  date?: string;
  yearDayNum?: number;
  stack?: string[];
}