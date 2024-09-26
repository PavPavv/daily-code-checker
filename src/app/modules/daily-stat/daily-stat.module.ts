import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyStatContainerComponent } from './containers/daily-stat-container/daily-stat-container.component';
import { DailyStatTableComponent } from './components/daily-stat-table/daily-stat-table.component';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';



@NgModule({
  declarations: [
    DailyStatContainerComponent,
    DailyStatTableComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [
    DailyStatContainerComponent
  ]
})
export class DailyStatModule { }
