import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { SupabaseService } from '../../shared/services';
import * as actions from './daily-stat.actions';
import { DailyStatSbService } from '../services/daily-stat-sb.service';


@Injectable()
export class DailyStatisticsOverviewEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly supabaseService: SupabaseService,
    private readonly dailyStatsSupabaseService: DailyStatSbService,
  ) {}

  // Main "github" table with statistics per certain year
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

  addNewDailyStats$ = createEffect(() => {
    return  this.actions$.pipe(
      ofType(actions.addNewDailyStats),
      switchMap((action) => {
        return this.dailyStatsSupabaseService.addNewDailyStat({
          date: action.date,
          hours: action.hours,
          codingHours: action.codingHours,
          stack: action.stack,
        });
      }),
      map(() => actions.addNewDailyStatsSuccess()),
      catchError(() => of(actions.addNewDailyStatsError()))
    )
  });

  editDailyStats$ = createEffect(() => {
    return  this.actions$.pipe(
      ofType(actions.editDailyStats),
      switchMap((action) => {
        return this.dailyStatsSupabaseService.editDailyStat({
          id: action.id,
          date: action.date,
          hours: action.hours,
          codingHours: action.codingHours,
          stack: action.stack,
        });
      }),
      map(() => actions.addNewDailyStatsSuccess()),
      catchError(() => of(actions.addNewDailyStatsError()))
    )
  });
}

