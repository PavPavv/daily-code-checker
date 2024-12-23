import { Component, OnInit } from '@angular/core';
import { MAX_AVAILABLE_YEAR_CELLS } from '../../../../constants';
import { SupabaseService } from '../../../shared/services/supabase/supabase.service';
import { IWorkingNote } from '../../models';
import { TWorkingNoteResponse, TWorkingNoteResponseList } from '../../models/workingNote';

type Cell = {
  id: number;
  isDay: 'yes' | 'no';
}

@Component({
  selector: 'app-daily-stat-table',
  templateUrl: './daily-stat-table.component.html',
  styleUrl: './daily-stat-table.component.scss',
})
export class DailyStatTableComponent implements OnInit {
  private _years: string[] = this._generateYearsFromToCurrent();
  private _data: TWorkingNoteResponseList = []

  cells: Cell[] = new Array(MAX_AVAILABLE_YEAR_CELLS).fill({});
  activeBtnIdx = 0;
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    this._getFetchedData(this._years[this._years.length - 1]);
  }

  private _generateYearsFromToCurrent(from = '2020'): string[] {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let i = Number(from); i <= currentYear; i++) {
      years.push(i.toString());
    }
    return years;
  }

  private async _getFetchedData(year: string): Promise<void> {
    try {
      this.isLoading = true;
      const response = await this.supabaseService.getWorkingNotesByYear(year);
      if (response && response?.data) {
        // TODO: add dynamic years
        this._fillCells(this._years[0]);
        this._data = response?.data.sort((
          a: TWorkingNoteResponse, b: TWorkingNoteResponse
        ) => {
          return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        });
        this.isError = false;
        this.addDataToTable(this._years[0]);
      } else if (response?.error) {
        console.log('An error occurred while fetching working notes');
        this.isError = true;
      }
    } catch(error) {
      console.log('An error occurred while fetching working notes', error);
      this.isError = true;
    } finally {
      this.isLoading = false;
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
          isDay: 'yes',
        };
      } else {
        return {
          id: i,
          isDay: 'no',
        };
      }
    })
    this.cells = daysArr;

    if (lastDayOfYear === 0) {
      for (let i = 0; i < this.cells.length; i++) {
        if (i === this.cells.length - 1) {
          this.cells[i] = {
            id: i,
            isDay: 'yes',
          };
        }  
      }
    }
  }

  private _calcYearDays(year: number): number {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365;
  }

  getYears(): string[] {
    return this._years.sort((a: string, b: string) => Number(b) - Number(a));
  }

  onClickYear(year: string, idx: number) {
    this.activeBtnIdx = idx;
    this._fillCells(year);
    this._getFetchedData(year);
  }

  addDataToTable(year: string) {
    console.log('addDataToTable', this._data);
    console.log('addDataToTable this.cells', this.cells);

  }
}
