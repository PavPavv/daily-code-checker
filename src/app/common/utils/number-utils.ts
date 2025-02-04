import { REG_EX_ONLY_NUMBERS_ANY_AMOUNT } from '../../constants';

export function filterNumbers(val: string): string {
  return val.replace(REG_EX_ONLY_NUMBERS_ANY_AMOUNT, '');
}