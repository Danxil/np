import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';

import meta from './meta';
import user from './user';
import statistic from './statistic';
import withdraws from './withdraws';
import purchases from './purchases';
import spinners from './spinners';
import gameConfig from './gameConfig';
import adminStatistic from './adminStatistic';
import userEpic from './user/epics';
import statisticEpic from './statistic/epics';
import paymentsEpic from './withdraws/epics';

import { setSpinnerStatus } from './spinners/actions';

export const rootReducer = combineReducers({
  user,
  statistic,
  withdraws,
  purchases,
  meta,
  spinners,
  gameConfig,
  adminStatistic,
  localize: localizeReducer,
});

export const rootEpic = combineEpics(
  userEpic,
  gameEpic,
  statisticEpic,
  paymentsEpic,
  tablesEpic,
  (action$) => action$.pipe(
    filter(({ type }) => type.indexOf('REQUEST') !== -1),
    map(({ type }) => setSpinnerStatus({ key: `REST_API.${type}`, active: true })),
  ),
);
