import { connect } from 'react-redux';
import {
  getUserInfo,
  logout,
  signIn,
  signUp,
  confirmWelcome,
  getReferrals,
  getNotVerifiedUsers,
  unverifyUser,
  reinvestProfit,
} from '../redux/user/actions';

export default () => connect(
  ({
    user: {
      userInfo,
      userInfoRequestDone,
      users,
    }
  }) => ({
    userInfo,
    userInfoRequestDone,
    users,
  }),
  (dispatch) => {
    return {
      getUserInfo() {
        return dispatch(getUserInfo());
      },
      logout() {
        return dispatch(logout());
      },
      signIn(values) {
        return dispatch(signIn(values));
      },
      signUp(values) {
        return dispatch(signUp(values));
      },
      confirmWelcome() {
        return dispatch(confirmWelcome());
      },
      getReferrals() {
        return dispatch(getReferrals());
      },
      getNotVerifiedUsers() {
        return dispatch(getNotVerifiedUsers());
      },
      unverifyUser({ userId }) {
        return dispatch(unverifyUser({ userId }));
      },
      reinvestProfit(values) {
        return dispatch(reinvestProfit(values));
      },
    };
  }
);
