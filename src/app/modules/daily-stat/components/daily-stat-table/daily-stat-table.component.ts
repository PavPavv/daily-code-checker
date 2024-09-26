import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-stat-table',
  templateUrl: './daily-stat-table.component.html',
  styleUrl: './daily-stat-table.component.scss'
})
export class DailyStatTableComponent {
  private _years: string[] = [];

  constructor() {
    this._years = ['2023', '2024', '2025'];
  }

  getYears(): string[] {
    return this._years;
  }
}
