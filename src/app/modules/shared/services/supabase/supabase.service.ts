import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment.development';
import { IWorkingNote } from '../../../daily-stat/models';

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
    return await this._supabase?.from('working_hours').select();
  }

  // async fetchWorkingNotes(): Promise<void> {
  //   try {
  //     const data = await this._supabase?.from('working_hours').select();
  //     if (data && data?.data) {
  //       console.log('Success!');
  //       this._workingNotes = data?.data;
  //       this.isReady.set(true);
  //     } else if (data?.error) {
  //       console.log('An error occurred while fetching working notes', data?.error);
  //     }
  //   } catch (error) {
  //     console.log('An error occurred while fetching working notes', error);
  //   } finally {
  //     this.isReady.set(false);
  //   }
  // }

  // getWorkingNotes(): Observable<IWorkingNote[]> {
  //   return of(this._workingNotes);
  // }

}
