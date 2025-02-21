import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment.development';
import { AddStatsDispatchData, EditStatsDispatchData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DailyStatSbService {
  private _supabase: SupabaseClient | undefined;

  constructor() {
    if (!this._supabase) {
      this._supabase =
        createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  }

  async addNewDailyStat(data: AddStatsDispatchData): Promise<any> {
    const result = await this._supabase?.from('working_hours')
      .insert({
        date: new Date(data?.date),
        hours: data?.hours,
        coding_hours: data?.codingHours,
        stack: data?.stack,
      });
  }

  async editDailyStat(data: EditStatsDispatchData): Promise<any> {
    const result = await this._supabase?.from('working_hours')
      .update({
        date: new Date(data.date),
        hours: data?.hours,
        coding_hours: data?.codingHours,
        stack: data?.stack,
      })
      .eq('id', data.id);
  }
}
