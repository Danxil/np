import { FIXED_DIGITS } from '../config';

export const toFixedIfNeed = (val) => {
  return parseFloat(val.toFixed(FIXED_DIGITS));
};
