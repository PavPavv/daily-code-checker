import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _years: string[] = ['2020', '2021',  '2022', '2023', '2024', '2025'];

  currentYear$: BehaviorSubject<string> = new BehaviorSubject<string>(new Date().getFullYear().toString());
  
  getYears(): string[] {
    return this._years;
  }
}
