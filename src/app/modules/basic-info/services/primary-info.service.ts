import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGitUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PrimaryInfoService {
  private baseUrl = 'https://api.github.com/users/';

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<IGitUser> {
    const url = 'PavPavv';
    return this.http.get<IGitUser>(this.baseUrl + url);
  }
}


