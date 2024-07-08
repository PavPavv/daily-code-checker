import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBasicInfoState } from '../models/basic-info-state.model';

export const selectBasicInfoState = createFeatureSelector<IBasicInfoState>('basicInfo');
export const selectBasicInfo = createSelector(
  selectBasicInfoState, (state) => state.basicInfo
);