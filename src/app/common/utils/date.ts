export function getYearDayNumber(date: Date): number {
  return (
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}