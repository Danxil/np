import { connect } from 'react-redux';
import { createSupportTicket } from '../redux/support/actions';

export default () => connect(
  () => ({}),
  (dispatch) => {
    return {
      createSupportTicket(values) {
        return dispatch(createSupportTicket(values));
      },
    };
  }
);
