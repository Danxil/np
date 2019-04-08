import { connect } from 'react-redux';

export default () => connect(
  ({
    withdraws: {
      history,
    }
  }) => ({
    withdraws: history,
  })
);
