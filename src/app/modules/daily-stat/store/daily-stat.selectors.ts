import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IDailyStatisticsState } from '../models/daily-statistics-state.model';

export const selectDailyStatsOverviewState = createFeatureSelector<IDailyStatisticsState>('DailyStatOverview');
export const selectDailyStatisticsByYear = createSelector(
  selectDailyStatsOverviewState, (state) => {
    return state.dailyStatsByYear;
  }
);