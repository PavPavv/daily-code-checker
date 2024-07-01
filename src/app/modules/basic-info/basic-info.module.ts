import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';
import { BasicInfoContainerComponent } from './containers/basic-info-container.component';
import { BasicInfoPrimaryComponent } from './components/basic-info-primary/basic-info-primary.component';
import { BasicInfoBadgeComponent } from './components/basic-info-badge/basic-info-badge.component';


@NgModule({
  declarations: [BasicInfoContainerComponent, BasicInfoPrimaryComponent, BasicInfoBadgeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SharedComponentsModule,
  ],
  exports: [BasicInfoContainerComponent, BasicInfoPrimaryComponent]
})
export class BasicInfoModule {}
