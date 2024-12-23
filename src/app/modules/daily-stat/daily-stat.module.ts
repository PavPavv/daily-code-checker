import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyStatContainerComponent } from './containers/daily-stat-container/daily-stat-container.component';
import { DailyStatTableComponent } from './components/daily-stat-table/daily-stat-table.component';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { DailyStatisticsOverviewEffects, dailyStatisticsOverviewReducer } from './store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    DailyStatContainerComponent,
    DailyStatTableComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    StoreModule.forFeature('DailyStatOverview', dailyStatisticsOverviewReducer),
    EffectsModule.forFeature([DailyStatisticsOverviewEffects]),
  ],
  exports: [
    DailyStatContainerComponent
  ]
})
export class DailyStatModule { }
