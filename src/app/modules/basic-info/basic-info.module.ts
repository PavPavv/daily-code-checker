import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {MatCardModule} from '@angular/material/card';

import { SharedComponentsModule } from '../shared/ui/shared-components.module';
import { BasicInfoContainerComponent } from './containers/basic-info-container.component';
import { BasicInfoPrimaryComponent } from './components/basic-info-primary/basic-info-primary.component';
import { BasicInfoBadgeComponent } from './components/basic-info-badge/basic-info-badge.component';
import { basicInfoReducer } from './store';
import { BasicInfoEffects } from './store/basic-info.effects';
import { BasicInfoGreetComponent } from './components/basic-info-greet/basic-info-greet.component';
import { BasicInfoSkillsComponent } from './components/basic-info-skills/basic-info-skills.component';
import { DailyStatModule } from '../daily-stat/daily-stat.module';


@NgModule({
  declarations: [
    BasicInfoContainerComponent,
    BasicInfoPrimaryComponent,
    BasicInfoBadgeComponent,
    BasicInfoGreetComponent,
    BasicInfoSkillsComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('basicInfo', basicInfoReducer),
    EffectsModule.forFeature([BasicInfoEffects]),
    MatCardModule,
    SharedComponentsModule,
    DailyStatModule,
  ],
  exports: [BasicInfoContainerComponent, BasicInfoPrimaryComponent]
})
export class BasicInfoModule {}
