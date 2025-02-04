import { createAction, props } from '@ngrx/store';
import { DailyStat } from '../../../common/models';
import { AddStatsDispatchData, EditStatsDispatchData } from '../models';

const preffix = '[DailyStatsOverview]';

export const getDailyOverviewByYear = createAction(
  `${preffix} Get Daily List By Year`,
  props<{ year: string; }>()
);
export const getDailyOverviewByYearSuccess = createAction(
  `${preffix} Get Daily List By Year Success`, props<{ data: DailyStat[] }>()
);
export const getDailyOverviewByYearError = createAction(
  `${preffix} Get Daily List By Year Error`, props<{ error: any }>()
);

export const addNewDailyStats = createAction(
  `${preffix} Add New Daily Stat`,
  props<AddStatsDispatchData>()
);
export const addNewDailyStatsSuccess = createAction(
  `${preffix} Add New Daily Stat Success`
);
export const addNewDailyStatsError = createAction(
  `${preffix} Add New Daily Stat Error`
);

export const editDailyStats = createAction(
  `${preffix} Edit Daily Stat`,
  props<EditStatsDispatchData>()
);
export const editDailyStatsSuccess = createAction(
  `${preffix} Edit Daily Stat Success`
);
export const editDailyStatsError = createAction(
  `${preffix} Edit Daily Stat Error`
);