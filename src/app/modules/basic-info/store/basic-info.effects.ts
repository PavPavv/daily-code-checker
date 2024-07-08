import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';

import { PrimaryInfoService } from '../services/primary-info.service';
import * as actions from './basic-info.actions';


@Injectable()
export class BasicInfoEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly basicInfoService: PrimaryInfoService,
  ) {}

  getBasicInfoData$ = createEffect(() => 
    this.actions$.pipe(
      ofType(actions.getUserInfo),
      switchMap(() => this.basicInfoService.getUserInfo()),
      map((data) => actions.getUserInfoSuccess({ data })),
      catchError((error) => of(actions.getUserInfoError({ error })))
    )
  );
}

