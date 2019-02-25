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
      createInvestment({ amount, tariffId, billingSystemId }) {
        return dispatch(createInvestment({ amount, tariffId, billingSystemId }))
      }
    };
  }
);
