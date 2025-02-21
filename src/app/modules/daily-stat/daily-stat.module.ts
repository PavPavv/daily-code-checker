import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DailyStatContainerComponent } from './containers/daily-stat-container/daily-stat-container.component';
import { DailyStatTableComponent } from './components/daily-stat-table/daily-stat-table.component';
import { DailyStatisticsOverviewEffects, dailyStatisticsOverviewReducer } from './store';
import { AddStatDialogComponent } from './components/add-stat-dialog/add-stat-dialog.component';

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
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  exports: [
    DailyStatContainerComponent
  ]
})
export class DailyStatModule { }
