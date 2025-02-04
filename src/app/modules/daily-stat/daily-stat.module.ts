import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';

import { DailyStatContainerComponent } from './containers/daily-stat-container/daily-stat-container.component';
import { DailyStatTableComponent } from './components/daily-stat-table/daily-stat-table.component';
import { DailyStatisticsOverviewEffects, dailyStatisticsOverviewReducer } from './store';
import { AddStatDialogComponent } from './components/add-stat-dialog/add-stat-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DailyStatContainerComponent,
    DailyStatTableComponent,
    AddStatDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    StoreModule.forFeature('DailyStatOverview', dailyStatisticsOverviewReducer),
    EffectsModule.forFeature([DailyStatisticsOverviewEffects]),
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    DailyStatContainerComponent
  ]
})
export class DailyStatModule { }
