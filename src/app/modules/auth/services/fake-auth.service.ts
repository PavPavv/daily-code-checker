import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const STORAGE_AUTH_VALUE = 'SomeSuperHardToHackAuthHashStub';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {
  constructor() {}

  private _checkCreds(creds: { email: string, password: string }): boolean {
    if (creds.email === environment.email && creds.password === environment.password) {
      return true;
    }
    return false;
  }

  private async _setupLocalStorageFlag(): Promise<void> {
    window.localStorage.setItem(environment.storageAuthKey, STORAGE_AUTH_VALUE);
  }

  async login(payload: { email: string, password: string }): Promise<string> {
    return new Promise((res, rej) => {
      if (this._checkCreds(payload)) {
        this._setupLocalStorageFlag();
        setTimeout(() => {
          res('success');
        }, 1500);
      } else {
        setTimeout(() => {
          rej('error');
        }, 1500);
      } 
    });
  }

  async isLoggedIn(): Promise<boolean> {
    const test = window.localStorage.getItem(environment.storageAuthKey);
    if (test) {
      return new Promise((res) => {
        return res(true);
      });
    } else {
      return new Promise((_, rej) => {
        return rej(false);
      });
    }
  }

  logout() {
    window.localStorage.removeItem(environment.storageAuthKey);
  }
}
