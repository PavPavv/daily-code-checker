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
    // console.log('data addNewDailyStat: ', data);
    const result = await this._supabase?.from('working_hours')
      .insert({
        date: new Date(data?.date),
        hours: data?.hours,
        coding_hours: data?.codingHours,
        stack: data?.stack,
      });
    console.log('add new result: ', result);
    // if (error) {
    //   // TODO: create toasts and errors services
    //   console.log(result);
    // }
  }

  async editDailyStat(data: EditStatsDispatchData): Promise<any> {
    // console.log('edit data', data);
    const result = await this._supabase?.from('working_hours')
      .update({
        date: new Date(data.date),
        hours: data?.hours,
        coding_hours: data?.codingHours,
        stack: data?.stack,
      })
      .eq('id', data.id);
    console.log('add new result: ', result);
    // if (error) {
    //   // TODO: create toasts and errors services
    //   console.log(result);
    // }
  }
}
