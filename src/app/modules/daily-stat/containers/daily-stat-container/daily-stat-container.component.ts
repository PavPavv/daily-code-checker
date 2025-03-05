import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-daily-stat-container',
  templateUrl: './daily-stat-container.component.html',
  styleUrl: './daily-stat-container.component.scss'
})
export class DailyStatContainerComponent {
  constructor (private readonly store: Store) {}
}
