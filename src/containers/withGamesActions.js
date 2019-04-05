import { connect } from 'react-redux';
import {
  connectToGame,
  disconnectFromGame,
  notifyGameSpinStart,
  notifyCreateGame,
  initWs,
  closeWs,
} from '../redux/games/actions';

export default () => connect(null, (dispatch) => ({
    connectToGame({ gameId }) {
      return dispatch(connectToGame({ gameId }));
    },
    disconnectFromGame({ gameId }) {
      return dispatch(disconnectFromGame({ gameId }));
    },
    notifyGameSpinStart({ gameId, result }) {
      return dispatch(notifyGameSpinStart({ gameId, result }))
    },
    notifyCreateGame({ game }) {
      return dispatch(notifyCreateGame({ game }));
    },
    initWs() {
      return dispatch(initWs());
    },
    closeWs() {
      return dispatch(closeWs());
    },
  }),
);
