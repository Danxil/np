import { connect } from 'react-redux';
import {
  getBusinessConfig,
} from '../redux/businessConfig/actions';

export default () => connect(
  ({ businessConfig }) => {
    return {
      businessConfig,
    };
  }, (dispatch) => ({
    getBusinessConfig() {
      return dispatch(getBusinessConfig());
    }
  }),
);
