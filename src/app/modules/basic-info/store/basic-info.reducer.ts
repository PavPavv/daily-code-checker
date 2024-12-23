import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './index';
import { IBasicInfoState } from '../models';

export const initialBasicInfoState: IBasicInfoState = {
  basicInfo: null,
  isLoading: false,
  error: null,
};

const reducer = createReducer(
  initialBasicInfoState,
  
  on(actions.getUserInfo, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(actions.getUserInfoSuccess, (state, { data }) => {
    return {
      ...state,
      basicInfo: data,
      isLoading: false,
      error: null,
    };
  }),

  on(actions.getUserInfoError, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
);

export const basicInfoReducer =
  (state = initialBasicInfoState, actions: Action): IBasicInfoState => 
  {
    return reducer(state, actions);
  };
