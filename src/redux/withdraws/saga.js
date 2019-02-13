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
        <Providers><Fragment><Translate id="WITHDRAW_CREATED_SUCCESS" />!</Fragment></Providers>
      </span>
    )
  });

}
