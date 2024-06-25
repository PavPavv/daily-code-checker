import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppModule { }
