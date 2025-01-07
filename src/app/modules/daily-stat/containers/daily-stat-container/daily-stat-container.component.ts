import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-daily-stat-container',
  templateUrl: './daily-stat-container.component.html',
  styleUrl: './daily-stat-container.component.scss'
})
export class DailyStatContainerComponent implements OnInit {
  public years: string[] = ['2020', '2021',  '2022', '2023', '2024', '2025'];

  constructor (private readonly store: Store) {}

  ngOnInit(): void {
    // TODO: add dynamic years calculation
  }
}
