import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MAX_AVAILABLE_YEAR_CELLS } from '../../../../constants';
import { SupabaseService } from '../../../shared/services/supabase/supabase.service';
import { IWorkingNote } from '../../models';

type Cell = {
  id: number;
  isDay: 'yes' | 'no';
}

@Component({
  selector: 'app-daily-stat-table',
  templateUrl: './daily-stat-table.component.html',
  styleUrl: './daily-stat-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyStatTableComponent implements OnInit {
  private _years: string[] = ['2020', '2021',  '2022', '2023', '2024'];
  private _data: IWorkingNote[] = []

  cells: Cell[] = new Array(MAX_AVAILABLE_YEAR_CELLS).fill({});
  activeBtnIdx = 0;
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this._fillCells(this._years[0]);
    console.log(this.cells);

    // TODO: Supabase
    // this._getData();
    try {
      this.isLoading = true;
      const response = await this.supabaseService.getWorkingNotes();
      if (response && response?.data) {
        console.log('WTF', response?.data);
        this._data = response?.data;
        this.isError = false;
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

  // private _getData() {
  //   this.supabaseService.fetchWorkingNotes();
  //   if (this.supabaseService.isReady()) {
  //     console.log('WTF???!!!');
  //     this.supabaseService.getWorkingNotes().subscribe((data) => {
  //       this._data = data;
  //       console.log('???', data);
  //       console.log('_data', this._data);
  //     });
  //   }
  // }

  getYears(): string[] {
    return this._years.sort((a: string, b: string) => Number(b) - Number(a));
  }

  onClickYear(year: string, idx: number) {
    this.activeBtnIdx = idx;
    this._fillCells(year);
  }
}
