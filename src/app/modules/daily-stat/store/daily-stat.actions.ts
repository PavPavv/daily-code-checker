import { createAction, props } from '@ngrx/store';
import { DailyStat } from '../../../common/models';

const preffix = '[DailyStatsOverview]';

export const getDailyOverviewByYear = createAction(
  `${preffix} Get Daily List By Year`,
  props<{ year: string; }>()
);

export const getDailyOverviewByYearSuccess = createAction(
  `${preffix} Success`, props<{ data: DailyStat[] }>()
);

export const getDailyOverviewByYearError = createAction(
  `${preffix} Error`, props<{ error: any }>()
);