import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import logger from 'redux-logger'
import { fork, takeLatest } from 'redux-saga/effects';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';

import userSaga from './user/saga';
import investmentsSaga from './investments/saga';
import withdrawsSaga from './withdraws/saga';
import user from './user';
import spinners from './spinners';
import tariffs from './tariffs';
import withdraws from './withdraws';
import businessConfig from './businessConfig';
import adminStatistic from './adminStatistic';
import investments from './investments';
import { setSpinnerStatus } from './spinners/actions';
import restApiInjector from './middlewares/restApiInjector';
import spinnerMiddleware from './middlewares/spinnerMiddleware';

export default ({ history }) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    spinners,
    user,
    tariffs,
    withdraws,
    businessConfig,
    investments,
    adminStatistic,
    localize: localizeReducer,
  });

  const rootSaga = function* () {
    yield fork(userSaga);
    yield fork(withdrawsSaga);
    yield fork(investmentsSaga);
    yield fork(function* () {
      yield takeLatest(
        ({ type }) => {
          return type.indexOf('REQUEST') !== -1;
        }, ({ type }) => {
          setSpinnerStatus({ key: `REST_API.${type}`, active: true })
        }
      );
    });
  };

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    restApiInjector,
    apiMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
    spinnerMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') middlewares.push(logger);

  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store
}
