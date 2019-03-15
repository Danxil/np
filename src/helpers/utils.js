import queryString from 'query-string';
import { FIXED_DIGITS } from '../config';

export const toFixedIfNeed = (val) => {
  return parseFloat(val.toFixed(FIXED_DIGITS));
};
export const getReasignedSearchQuery = (assign) => {
  const fullSearch = { ...queryString.parse(location.search), ...assign };
  const newSearch = Object.keys(fullSearch).reduce((prev, key) => {
    if (fullSearch[key] !== null && fullSearch[key] !== undefined && fullSearch[key] !== '') {
      prev[key] = fullSearch[key];
    }
    return prev;
  }, {});
  return queryString.stringify(newSearch);
};
