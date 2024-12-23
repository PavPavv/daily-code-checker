export interface DailyStat {
  id: number;
  date: string;
  coding_hours: number;
  stack: string[];
}

export interface DailyStatOverviewResponse {
  error: any;
  data: DailyStat[];
  count: any;
  status: number;
  statusText: string;
}

export interface IWorkingNote {
  id: number;
  coding_hours: number;
  stack: string[];
  data?: string;
  created_at?: string;
  hours?: number;
}