import { createAction, props } from '@ngrx/store';

import { BasicInfoError, IGitUser } from '../models';

const preffix = '[BasicInfo]';

export const getUserInfo = createAction(`${preffix} Get User Info`);

export const getUserInfoSuccess = createAction(
  `${preffix} Success`, props<{ data: IGitUser }>()
);

export const getUserInfoError = createAction(
  `${preffix} Error`, props<{ error: BasicInfoError }>()
);