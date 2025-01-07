import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { TooltipComponent } from './tooltip/tooltip.component';
import { HeaderComponent } from './header/header.component';
import { BlockComponent } from './block/block.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TooltipComponent,
    BlockComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    HeaderComponent,
    TooltipComponent,
    BlockComponent,
    InputComponent,
  ]
})
export class SharedComponentsModule {}
