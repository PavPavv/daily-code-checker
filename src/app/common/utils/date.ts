export function getYYYYMMDDByDayNum(year: string, dayIdx?: number): string {
  if (dayIdx) {
    const startDate = new Date(Number(year), 0);
    startDate.setDate(startDate.getDate() + dayIdx);
    return startDate.toISOString().split('T')[0];
  }
  return `XXXX-XX-XX`;
}

export function dayOfYear(date: Date): number {
  return Math.floor(
    (date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf())
    / (1000 * 60 * 60 * 24));
}