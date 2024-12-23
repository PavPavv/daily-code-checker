import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MAX_AVAILABLE_YEAR_CELLS } from '../../../../constants';
import { SupabaseService } from '../../../shared/services/supabase/supabase.service';
import { Store } from '@ngrx/store';
import * as fromDailyStat from '../../store';
import { DailyStat } from '../../../../common/models';
import { getYearDayNumber } from '../../../../common/utils';
import { Cell } from '../../models';

const GOOD_WORK_HOURS_AMOUNT = 4;
const NORMAL_WORK_HOURS_AMOUNT = 2;

@Component({
  selector: 'app-daily-stat-table',
  templateUrl: './daily-stat-table.component.html',
  styleUrl: './daily-stat-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyStatTableComponent implements OnInit {
  @Input() years: string[] = [];
  
  private _currentYearInitial: string = new Date().getFullYear().toString();
  // TODO: add proper type
  private _data: DailyStat[] = [];

  cells: Cell[] = new Array(MAX_AVAILABLE_YEAR_CELLS).fill({});
  activeBtnIdx = 0;
  isError: boolean = false;
  isLoading: boolean = false;
  shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  private _actualYearBehaviorSubject =
    new BehaviorSubject<string>(this._currentYearInitial);

  constructor(
    private cdr: ChangeDetectorRef,
    private readonly store: Store,
    private readonly supabaseService: SupabaseService
  ) {
  }

  ngOnInit(): void {
    this._generateYearOverview();

    this._actualYearBehaviorSubject.subscribe((pickedYear) => {
      if (pickedYear) {
        this.store.dispatch(fromDailyStat.getDailyOverviewByYear({ year: pickedYear }));
      }
    });

    this.store.select(fromDailyStat.selectDailyStatisticsByYear).subscribe((data) => {
      if (data && data.length) {
        this._addStatsDataToCells(data);
      }
    });
  }

  private _generateYearOverview(): void {
    if (this.years && this.years.length) {
      this._fillCells(this.years[this.years.length - 1]);
    }
  }

  private _fillCells(year: string): void {
    let totalDaysInYear = this._calcYearDays(Number(year));

    const firstDayOfYear = new Date(`${year}-01-01`).getDay();
    const firstDayOfYearRu = firstDayOfYear === 0 ? 7 : firstDayOfYear;
    const lastDayOfYear = new Date(`${year}-12-31`).getDay();

    if (lastDayOfYear === 0) {
      totalDaysInYear = this._calcYearDays(Number(year)) - 1;
    }

    const daysArr: Cell[] = this.cells.map((_, i) => {
      if (i >= firstDayOfYearRu - 1 && i < totalDaysInYear ) {
        return {
          id: i,
          isDay: true,
        };
      } else {
        return {
          id: i,
          isDay: false,
        };
      }
    })
    this.cells = daysArr;

    if (lastDayOfYear === 0) {
      for (let i = 0; i < this.cells.length; i++) {
        if (i === this.cells.length - 1) {
          this.cells[i] = {
            id: i,
            isDay: true,
          };
        }  
      }
    }
  }

  private _addStatsDataToCells(data: DailyStat[]): void {
    const firstDataDayIdx = getYearDayNumber(new Date(data[0].date)) - 1;
    const emptyStartCells = this.cells.slice(0, firstDataDayIdx);
    const restDaysCells = this.cells.slice(firstDataDayIdx).map((cell: Cell, i: number) => {
      return {
        ...cell,
        codeHours: data[i]?.coding_hours ?? 0,
        date: data[i]?.date,
      }
    });
    const result = [...emptyStartCells, ...restDaysCells];
    this.cells = result;
    this.cdr.markForCheck();
  }

  private _calcYearDays(year: number): number {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365;
  }

  isGoodWork(workHours = 0) {
    if (workHours >= GOOD_WORK_HOURS_AMOUNT) {
      return true;
    }
    return false;
  }

  isNormalWork(workHours = 0) {
    if (workHours >= NORMAL_WORK_HOURS_AMOUNT && workHours < GOOD_WORK_HOURS_AMOUNT) {
      return true;
    }
    return false;
  }

  getYears(): string[] {
    return this.years.sort((a: string, b: string) => Number(b) - Number(a));
  }

  onClickYear(year: string, idx: number) {
    this._actualYearBehaviorSubject.next(year);
    this.activeBtnIdx = idx;
    this._fillCells(year);
  }
}
