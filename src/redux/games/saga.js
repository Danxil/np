import React, { Fragment } from 'react';
import { message, notification } from 'antd';
import { Translate } from 'react-localize-redux';
import { eventChannel } from 'redux-saga';
import { takeLatest, put, select, take } from 'redux-saga/effects';
import Providers from '../Providers';
import { setSpinnerStatus } from '../spinners/actions';
import ws from '../../helpers/ws';

export default function* () {
  yield takeLatest('CLOSE_WS', () => {
    ws.instance.close();
  });
  yield takeLatest('INIT_WS', function* () {
    const channel = eventChannel(emitter => {
      ws.init();
      ws.instance
      .on('close', () => {
        if (this.props.userInfo)
          notification.error({
            key: 'CONNECTION_LOST',
            description: (
              <Fragment>
                {this.props.translate('CONNECTION_WITH_SERVER_LOST_TRY_REFRESH_THE_PAGE')}...
              </Fragment>
            ),
            duration: 0,
          });
      })
      .on('open', () => notification.close( 'CONNECTION_LOST'))
      .on('message', function({ type, payload }) {

        if (type.indexOf('NOTIFICATION') !== -1) {
          ws.instance.send({ type, payload });
        } else {
          emitter({ type, payload });
        }
      });
      return () => {};
    });
    while (true) {
       const action = yield take(channel);
       if (!action) break;
       yield put(action);
     }
  });
  yield takeLatest('NOTIFICATION_GAME_USER_CONNECT', () => {
    put(setSpinnerStatus({ key: 'GAME_CHOOSE', active: true }));
  });
  yield takeLatest('GAME_UPDATED', function* ({ payload: { result, reason, game: { creatorUserId, risk, connectedUser } } }) {
    const state = yield select();
    if (reason !== 'GAME_SPIN_DONE' || creatorUserId !== state.user.userInfo.id) return;
    const { displayName } = connectedUser;
    if (result < 0) {
      message.success(<span>
        +{risk} $ <Providers><Fragment><Translate id="USER_LOSE_IN_YOU_LOT" data={{ displayName }} />!</Fragment></Providers>
      </span>)
    } else {
      message.error(<span>
        -{risk} $ <Providers><Fragment><Translate id="USER_WON_IN_YOU_LOT" data={{ displayName }} /></Fragment></Providers>
      </span>)
    }
  });
  yield takeLatest('GAME_CREATED', function* ({ payload: { game: { creatorUserId } } }) {
    const state = yield select();
    if (creatorUserId == state.user.userInfo.id) message.info(
      <Providers><Translate id="LOT_CREATED" /></Providers>
    )
  });
  yield takeLatest('PLAYGROUND_UPDATED', function* ({ payload: { notifyUsersCreatorsIdsAboutGameExpired } }) {
    const state = yield select();
    if (notifyUsersCreatorsIdsAboutGameExpired.indexOf(state.user.userInfo.id) !== -1)
      message.info(
        <Providers><Translate id="YOU_LOT_EXPIRED" /></Providers>
      )
  });
}
