import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment.development';
import { IWorkingNote } from '../../../daily-stat/models';
import { TWorkingNoteResponseList } from '../../../daily-stat/models/workingNote';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private _supabase: SupabaseClient | undefined;
  private _workingNotes: IWorkingNote[] = [];

  constructor() {
    if (!this._supabase) {
      this._supabase =
        createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  }

  async getWorkingNotes(): Promise<any> {
    return await this._supabase?.from('working_hours')
      .select('id, date, coding_hours, stack');
  }

  async getWorkingNotesByYear(year: string): Promise<any> {
    return await this._supabase?.from('working_hours')
      .select('id, date, coding_hours, stack')
      .gte('date', `${year}-01-01`)
      .lte('date', `${year}-12-31`);
  }

}
