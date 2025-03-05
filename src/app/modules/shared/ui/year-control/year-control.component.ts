import { Component } from '@angular/core';

import { DateService } from '../../services/date/date.service';

@Component({
  selector: 'app-year-control',
  templateUrl: './year-control.component.html',
  styleUrl: './year-control.component.scss'
})
export class YearControlComponent {
  public activeBtnIdx = 0;
  public years: string[] = [];

  constructor(private dateService: DateService) {
    this.years = dateService.getYears();
  }

  getYears(): string[] {
    return this.years.sort((a: string, b: string) => Number(b) - Number(a));
  }

  onClickYear(year: string, idx: number) {
    if (year === this.dateService.currentYear$.getValue()) return;
    this.dateService.currentYear$.next(year);
    this.activeBtnIdx = idx;
  }
}
