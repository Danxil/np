import { notification } from 'antd';
import { getUserInfo, getNotVerifiedUsers } from './actions';
import { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Providers from '../Providers';
import React from 'react';
import { put, takeLatest } from 'redux-saga/effects';

export default function* () {
  yield takeLatest([
    'SIGN_UP_SUCCESS',
    'SIGN_IN_SUCCESS',
    'CREATE_WITHDRAW_SUCCESS',
    'CREATE_INVESTMENT_SUCCESS',
    'REINVEST_PROFIT_SUCCESS',
  ], function *() {
    yield put(getUserInfo())
  });
  yield takeLatest([
    'UNVERIFY_USER_SUCCESS',
  ], function *() {
    yield put(getNotVerifiedUsers())
  });
  yield takeLatest('SIGN_IN_FAILURE', (action) => {
    notification.error({
      duration: 5,
      description: <Providers>
        <Fragment>
          <Translate id={ action.payload.status === 401 ? 'EMAIL_OR_PASSWORD_IS_INCORRECT' : 'SERVER_ERROR'} />
        </Fragment>
      </Providers>
    });
  });
  yield takeLatest('SIGN_UP_FAILURE', (action) => {
    notification.error({
      duration: 5,
      description: <Providers>
        <Fragment>
          <Translate id={ action.payload.status === 400 ? 'THIS_EMAIL_IS_BUSY' : 'SERVER_ERROR'} />
        </Fragment>
      </Providers>
    });
  });
  yield takeLatest(['SIGN_IN_SUCCESS'], () => {
    notification.success({
      duration: 5,
      description:
        <Providers>
          <Fragment>
            <Translate id={'SIGN_IN_SUCCESS'} />
          </Fragment>
        </Providers>
    });
  });
  yield takeLatest(['SIGN_UP_SUCCESS'], (action) => {
    notification.success({
      duration: 5,
      description:
        <Providers>
          <Fragment>
            <Translate id={`SIGN_UP_${action.payload.accountType.toUpperCase()}_SUCCESS`} />
          </Fragment>
        </Providers>
    });
  });
  yield takeLatest(['REINVEST_PROFIT_SUCCESS'], () => {
    notification.success({
      duration: 5,
      description:
        <Providers>
          <Fragment>
            <Translate id="REINVEST_PROFIT_SUCCESS" />
          </Fragment>
        </Providers>
    });
  });
}
