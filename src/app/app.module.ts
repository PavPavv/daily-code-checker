import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { BasicInfoModule } from './modules/basic-info/basic-info.module';
import { DailyStatModule } from './modules/daily-stat/daily-stat.module';

import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedComponentsModule } from './modules/shared/ui/shared-components.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    MainPageComponent,
    AdminPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    SharedComponentsModule,
    BasicInfoModule,
    DailyStatModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimations()],
})
export class AppModule { }
