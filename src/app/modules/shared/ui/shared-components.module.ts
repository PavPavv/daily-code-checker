import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

import { TooltipComponent } from './tooltip/tooltip.component';
import { HeaderComponent } from './header/header.component';
import { BlockComponent } from './block/block.component';
import { OnlyNumberDirective } from '../../../common/directives';
import { defaultToastConfig, TOAST_CONFIG_TOKEN, ToastComponent } from './toast/toast.component';
import { LoaderComponent } from './loader/loader.component';
import { YearControlComponent } from './year-control/year-control.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TooltipComponent,
    BlockComponent,
    OnlyNumberDirective,
    ToastComponent,
    LoaderComponent,
    YearControlComponent,
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
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    TooltipComponent,
    BlockComponent,
    LoaderComponent,
    YearControlComponent
  ],
  providers: [
    {
      provide: TOAST_CONFIG_TOKEN,
      useValue: defaultToastConfig,
    }
  ],
})
export class SharedComponentsModule {}
