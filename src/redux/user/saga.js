import { notification } from 'antd';
import { getUserInfo } from './actions';
import { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Providers from '../Providers';
import React from 'react';
import { put, takeLatest } from 'redux-saga/effects';

export default function* () {
  yield takeLatest(['SIGN_UP_SUCCESS', 'SIGN_IN_SUCCESS'], function *() {
    yield put(getUserInfo())
  });
  yield takeLatest('SIGN_IN_FAILURE', (action) => {
    notification.error({
      duration: 10,
      description: <Providers>
        <Fragment>
          <Translate id={ action.payload.status === 401 ? 'EMAIL_OR_PASSWORD_IS_INCORRECT' : 'SERVER_ERROR'} />
        </Fragment>
      </Providers>
    });
  });
  yield takeLatest('SIGN_UP_FAILURE', (action) => {
    notification.error({
      duration: 10,
      description: <Providers>
        <Fragment>
          <Translate id={ action.payload.status === 400 ? 'THIS_EMAIL_IS_BUSY' : 'SERVER_ERROR'} />
        </Fragment>
      </Providers>
    });
  });
}
