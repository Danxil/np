import { notification } from 'antd';
import { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Providers from '../Providers';
import React from 'react';
import { takeLatest } from 'redux-saga/effects';

export default function* () {
  yield takeLatest('CREATE_INVESTMENT_SUCCESS', () => {
    notification.success({
      duration: 5,
      description: <Providers>
        <Fragment>
          <Translate id={'LOAN_ISSUED_SUCCESEFUL_MESSAGE'} />
        </Fragment>
      </Providers>
    });
  });
}
