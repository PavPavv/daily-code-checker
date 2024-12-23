export interface IWorkingNote {
  id: number;
  coding_hours: number;
  stack: string[];
  date: string;
  created_at?: string;
  hours?: number;
}

export type TWorkingNoteResponse =
  Pick<IWorkingNote, "id" | "date" | "coding_hours" | "stack">;

export type TWorkingNoteResponseList = TWorkingNoteResponse[];