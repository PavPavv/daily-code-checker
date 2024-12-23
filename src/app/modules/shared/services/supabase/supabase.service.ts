import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment.development';
import { DailyStat } from '../../../../common/models';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private _supabase: SupabaseClient | undefined;

  constructor() {
    if (!this._supabase) {
      this._supabase =
        createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  }


  private _sortByDate(data: DailyStat[]): DailyStat[] {
    return data.sort((a: DailyStat, b: DailyStat) => {
      return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    });
  }

  async getWorkingNotes(): Promise<any> {
    return await this._supabase?.from('working_hours')
      .select('id, date, coding_hours, stack');
  }

  async getWorkingNotesByYear(year: string): Promise<any> {
    const result =  await this._supabase?.from('working_hours')
      .select('id, date, coding_hours, stack')
      .gte('date', `${year}-01-01`)
      .lte('date', `${year}-12-31`);
    return this._sortByDate(result?.data as DailyStat[]);
  }

}
