import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { MAX_AVAILABLE_YEAR_CELLS } from '../../../../constants';
import * as fromDailyStats from '../../store';
import { DailyStat } from '../../../../common/models';
import { dayOfYear, getYYYYMMDDByDayNum } from '../../../../common/utils';
import { Cell } from '../../models';
import { AddStatDialogComponent } from '../add-stat-dialog/add-stat-dialog.component';
import { FakeAuthService } from '../../../auth/services/fake-auth.service';
import { DateService } from '../../../shared/services/date/date.service';

const GOOD_WORK_HOURS_AMOUNT = 4;
const MIN_WORK_HOURS_AMOUNT = 0.5;

@Component({
  selector: 'app-daily-stat-table',
  templateUrl: './daily-stat-table.component.html',
  styleUrl: './daily-stat-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyStatTableComponent implements OnInit {
  
  private _currentYearInitial: string = new Date().getFullYear().toString();
  private _currentChosenYear: string = this._currentYearInitial;
  
  years: string[] = [];
  isAuth = false;
  cells: Cell[] = [];
  // TODO: remove after refactor
  activeBtnIdx = 0;
  isError: boolean = false;
  isLoading: boolean = false;
  shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(
    private cdr: ChangeDetectorRef,
    private readonly store: Store,
    private dialog: MatDialog,
    private fakeAuthService: FakeAuthService,
    private dateService: DateService
  ) {
    this.years = dateService.getYears();
    this.dateService.currentYear$.subscribe((pickedYear) => {
      if (pickedYear) {
        this._currentChosenYear = pickedYear;
        this.store.dispatch(fromDailyStats.getDailyOverviewByYear({ year: pickedYear }));
        this._fillCells(this._currentChosenYear);
      }
    });
  }

  ngOnInit(): void {
    this._generateInitialYearOverview();

    this.store.select(fromDailyStats.selectDailyStatisticsByYear).subscribe((data) => {
      if (data && data.length) {
        this._addStatsDataToCells(data);
      }
    });

    this.fakeAuthService.isLoggedIn()
      .then((isLoggedIn) => {
        this.isAuth = isLoggedIn;
        this.cdr.markForCheck();
      });
  }

  private _getDailyDataByActiveYear() {
    this.store.dispatch(fromDailyStats.getDailyOverviewByYear({ year: this._currentChosenYear }));
  }

  private _generateInitialYearOverview(): void {
    if (this.years && this.years.length) {
      this._fillCells(this.years[this.years.length - 1]);
    }
  }

  private _resetCells(): void {
    this.cells = new Array(MAX_AVAILABLE_YEAR_CELLS).fill({});
  }

  // Main method to generate year day cells
  private _fillCells(year: string): void {
    this._resetCells();

    let totalDaysInYear = this._calcYearDays(Number(year));
    const firstDayOfYear = new Date(`${year}-01-01`).getDay();
    const firstDayOfYearRu = firstDayOfYear === 0 ? 7 : firstDayOfYear;
    const fullDaysInYearWithOffset = (totalDaysInYear - 1) + (firstDayOfYearRu - 1);

    const daysArr: Cell[] = this.cells.map((_, i) => {
      if ((i >= firstDayOfYearRu - 1) && (i <= fullDaysInYearWithOffset)) {
        return {
          id: undefined,
          isDay: true,
          yearDayNum: (i - firstDayOfYearRu) + 2,
        };
      } else {
        return {
          id: undefined,
          isDay: false,
        };
      }
    })
    this.cells = daysArr;
  }

  private _addStatsDataToCells(data: DailyStat[]): void {
    console.log('_addStatsDataToCells!');
    if (data && data.length) {
      // TODO: remove year constant after backend data completed
      if (Number(this.dateService.currentYear$.getValue()) > 2023) {
        const dataYearStartWeekDay = new Date(data[0]?.date).getDay();
        const datesBeginIdx = dataYearStartWeekDay === 0 ? 7 : dataYearStartWeekDay - 1;
        const emptyStartCells = this.cells.slice(0, datesBeginIdx);
        const restDaysCells = this.cells.slice(datesBeginIdx).map((cell: Cell, i: number) => {
          return {
            ...cell,
            rowHours: data[i]?.hours ?? 0,
            codeHours: data[i]?.coding_hours ?? 0,
            date: data[i]?.date,
            id: data[i]?.id,
            stack: data[i]?.stack,
          }
        });
        const result = [...emptyStartCells, ...restDaysCells];
        this.cells = result;
        this.cdr.markForCheck();

      // TODO: remove year constant after backend data completed
      } else if (Number(this.dateService.currentYear$.getValue()) === 2023) {
        console.log('2023');
        const firstWeekDayInYearNum = new Date('2023-01-01').getDay();
        const firstWeekDayInYear = firstWeekDayInYearNum ? firstWeekDayInYearNum : 7;
        const firstDataDate = data[0]?.date;
        if (firstDataDate) {
          const startIdx = (dayOfYear(new Date(firstDataDate)) - 1) + (firstWeekDayInYear - 1);
          if (startIdx) {
            const emptyStartCells = this.cells.slice(0, startIdx);
            const restDaysCells = this.cells.slice(startIdx).map((cell: Cell, i: number) => {
              return {
                ...cell,
                rowHours: data[i]?.hours ?? 0,
                codeHours: data[i]?.coding_hours ?? 0,
                date: data[i]?.date,
                id: data[i]?.id,
                stack: data[i]?.stack,
              }
            });
            const result = [...emptyStartCells, ...restDaysCells];
            this.cells = result;
            this.cdr.markForCheck();
          }
        }
      }
    }
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
    if (workHours >= MIN_WORK_HOURS_AMOUNT && workHours < GOOD_WORK_HOURS_AMOUNT) {
      return true;
    }
    return false;
  }

  getCellDate(cell: Cell): string {
    const pickedYear = this.dateService.currentYear$.getValue();
    return getYYYYMMDDByDayNum(pickedYear, cell?.yearDayNum);
  }

  // onClickYear(year: string, idx: number) {
  //   if (year === this._actualYearBehaviorSubject.getValue()) return;
  //   this._actualYearBehaviorSubject.next(year);
  //   this.activeBtnIdx = idx;
  //   this._fillCells(year);
  // }

  onCell(cell: Cell): void {
    if (this.isAuth) {
      const dialogRef = this.dialog.open(AddStatDialogComponent, {
        data: {
          id: cell?.id,
          date: this.getCellDate(cell),
          totalRowHours: cell?.rowHours,
          totalCleanHours: cell?.codeHours,
          stack: cell?.stack,
        },
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this._getDailyDataByActiveYear();
      });
    }
  }
}
