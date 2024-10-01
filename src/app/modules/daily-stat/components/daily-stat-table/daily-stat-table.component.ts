import { Component, OnInit } from '@angular/core';
import { DAYS_PER_WEEK, WEEKS_PER_YEAR } from '../../../../constants';

// const TEST_DATA = new Array(365).fill('');

const TEST_DATA = [
  {
    id: 1,
    count: 5,
    data: 'green',
  },
  {
    id: 2,
    count: 7,
    data: 'green',
  },
  {
    id: 3,
    count: 23,
    data: 'blue',
  },
];

const TEST_YEAR = [
  {
    id: 1,
    count: 1,
    d: '',
  },
  {
    id: 2,
    count: 1,
    d: '',
  },
  {
    id: 3,
    count: 1,
    d: '',
  },
  {
    id: 4,
    count: 1,
    d: '',
  },
  {
    id: 5,
    count: 1,
    d: '',
  },
  {
    id: 6,
    count: 1,
    d: '',
  },
  {
    id: 7,
    count: 1,
    d: '',
  },
];

type Cell = {
  id: number;
  isDay: 'yes' | 'no';
}

@Component({
  selector: 'app-daily-stat-table',
  templateUrl: './daily-stat-table.component.html',
  styleUrl: './daily-stat-table.component.scss'
})
export class DailyStatTableComponent implements OnInit {
  private _years: string[] = ['2023', '2024', '2025'];

  cells: Cell[] = new Array(371).fill({});

  constructor() {}

  ngOnInit(): void {
    this._fillCells();
    console.log(this.cells);
  }

  private _fillCells(): void {
    const daysArr: Cell[] = this.cells.map((cell, i) => {
      if (i > 5 && i <= 365 ) {
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
  }

  // private _calcYearDays(year: number): number {
  //   return ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365;
  // }

  getYears(): string[] {
    return this._years;
  }
}
