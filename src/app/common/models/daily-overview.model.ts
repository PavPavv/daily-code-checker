export interface DailyStat {
  id: number;
  date: string;
  hours: number;
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