import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { SupabaseService } from '../../shared/services';
import * as actions from './daily-stat.actions';


@Injectable()
export class DailyStatisticsOverviewEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly supabaseService: SupabaseService,
  ) {}

  getDailyOverviewByYear$ = createEffect(() => {
    return  this.actions$.pipe(
      ofType(actions.getDailyOverviewByYear),
      switchMap((action) => {
        return this.supabaseService.getWorkingNotesByYear(action.year);
      }),
      map((data) => actions.getDailyOverviewByYearSuccess({ data })),
      catchError((error) => of(actions.getDailyOverviewByYearError({ error })))
    )
  });
}

