import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { TooltipComponent } from './tooltip/tooltip.component';
import { HeaderComponent } from './header/header.component';
import { BlockComponent } from './block/block.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TooltipComponent,
    BlockComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
  ],
  exports: [
    HeaderComponent,
    TooltipComponent,
    BlockComponent,
  ]
})
export class SharedComponentsModule {}
