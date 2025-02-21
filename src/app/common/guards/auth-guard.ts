import { CanActivateFn } from '@angular/router';
import { environment } from '../../../environments/environment';

export const authGuard: CanActivateFn = () => {
  const test = window.localStorage.getItem(environment.storageAuthKey);
  return Boolean(test);
};