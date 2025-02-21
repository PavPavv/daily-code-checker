import { REG_EX_FLOAT_NUMBERS_ALLOWED } from '../../constants';

export function filterNumbers(val: string): string {
  return val.replace(REG_EX_FLOAT_NUMBERS_ALLOWED, '');
}