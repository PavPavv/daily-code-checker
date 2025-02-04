import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './index';
import { IDailyStatisticsState } from '../models';

export const initialDailyStatsOverviewState: IDailyStatisticsState = {
  dailyStatsByYear: null,
  isLoading: false,
  error: null,
  isAddNewLoading: false,
  isAddNewError: null,
};

const reducer = createReducer(
  initialDailyStatsOverviewState,
  
  on(actions.getDailyOverviewByYear, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(actions.getDailyOverviewByYearSuccess, (state, { data }) => {
    return {
      ...state,
      dailyStatsByYear: data,
      isLoading: false,
      error: null,
    };
  }),
  on(actions.getDailyOverviewByYearError, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(actions.addNewDailyStats, (state) => {
    return {
      ...state,
      isAddNewLoading: true,
      isAddNewError: null,
    };
  }),
  on(actions.addNewDailyStatsSuccess, (state) => {
    return {
      ...state,
      isAddNewLoading: false,
      isAddNewError: null,
    };
  }),
  on(actions.addNewDailyStatsError, (state) => {
    return {
      ...state,
      isAddNewLoading: false,
      isAddNewError: {},
    };
  }),
);

export const dailyStatisticsOverviewReducer =
  (state = initialDailyStatsOverviewState, actions: Action): IDailyStatisticsState => 
  {
    return reducer(state, actions);
  };
