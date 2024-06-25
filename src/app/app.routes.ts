import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  }
];
