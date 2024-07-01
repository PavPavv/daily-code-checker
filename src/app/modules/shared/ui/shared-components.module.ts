import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { TooltipComponent } from './tooltip/tooltip.component';



@NgModule({
  declarations: [
    TooltipComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    TooltipComponent,
  ]
})
export class SharedComponentsModule {}
