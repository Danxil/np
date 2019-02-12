import { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Providers from '../Providers';
import React from 'react';
import { takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

export default function* () {
  yield takeLatest('CREATE_WITHDRAW_SUCCESS', () => {
    message.success(
      <span>
        <Providers><Fragment><Translate id="YOUR_REQUEST_TO_WITHDRAW_WILL_BE_HANDLED_IN_THE_NEAREST_TIME" />!</Fragment></Providers>
      </span>
    )
  });

}
