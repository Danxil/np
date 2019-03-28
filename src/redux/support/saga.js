import { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Providers from '../Providers';
import React from 'react';
import { takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

export default function* () {
  yield takeLatest('CREATE_SUPPORT_TICKET_SUCCESS', () => {
    message.success(
      <span>
        <Providers><Fragment><Translate id="CREATE_SUPPORT_TICKET_SUCCESS" /></Fragment></Providers>
      </span>
    )
  });

}
