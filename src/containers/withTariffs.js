import { connect } from 'react-redux';
import { getTariffs } from '../redux/tariffs/actions';

export default () => connect(
  ({
    tariffs: {
      tariffs,
    }
  }) => ({
    tariffs,
  }),
  (dispatch) => {
    return {
      getTariffs() {
        return dispatch(getTariffs());
      },
    };
  }
);
