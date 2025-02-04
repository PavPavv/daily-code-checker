export interface AddStatDialogData {
  id?: number;
  date: string;
  totalRowHours: number;
  totalCleanHours: number;
  stack: string[];
}

export interface AddStatsDispatchData {
  date: string;
  hours: number;
  codingHours: number;
  stack: string[];
}

export interface EditStatsDispatchData {
  id: number;
  date: string;
  hours: number;
  codingHours: number;
  stack: string[];
}