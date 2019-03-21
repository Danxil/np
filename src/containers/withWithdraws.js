import { connect } from 'react-redux';
import { getWithdraws, createWithdraw, completeWithdraw } from '../redux/withdraws/actions';

export default () => connect(
  ({
    withdraws: {
      history,
    }
  }) => ({
    withdraws: history,
  }),
  (dispatch) => {
    return {
      getWithdraws({ filter } = {}) {
        return dispatch(getWithdraws({ filter }));
      },
      completeWithdraw({ withdrawId } = {}) {
        return dispatch(completeWithdraw({ withdrawId }));
      },
      createWithdraw({ amount, method, requisite }) {
        return dispatch(createWithdraw({ amount, method, requisite }))
      }
    };
  }
);
