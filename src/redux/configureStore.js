import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import logger from 'redux-logger'
import { all, takeLatest } from 'redux-saga/effects';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';

import userSaga from './user/saga';
import userReducer from './user';
import spinnersReducer from './spinners';
import { setSpinnerStatus } from './spinners/actions';
import restApiInjector from './middlewares/restApiInjector';
import spinnerMiddleware from './middlewares/spinnerMiddleware';

export default ({ history }) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    spinners: spinnersReducer,
    user: userReducer,
    localize: localizeReducer,
  });

  const rootSaga = function* () {
    yield all([
      userSaga,
      function* () {
        yield takeLatest(
          ({ type }) => {
            return type.indexOf('REQUEST') !== -1;
          }, ({ type }) => {
            setSpinnerStatus({ key: `REST_API.${type}`, active: true })
          }
        );
      },
    ]);
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
