import { connect } from 'react-redux';
import { getInvestments, createInvestment } from '../redux/investments/actions';

export default () => connect(
  ({
    investments: {
      list,
    }
  }) => ({
    investments: list,
  }),
  (dispatch) => {
    return {
      getInvestments() {
        return dispatch(getInvestments());
      },
      createInvestment({ amount, duration, tariffId, reliability }) {
        return dispatch(createInvestment({ amount, tariffId, duration, reliability }))
      }
    };
  }
);
