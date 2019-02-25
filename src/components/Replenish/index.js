import React from 'react';
import PropTypes from 'prop-types';
import Calculator from '../common/Calculator';
import { compose, pure, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import Container from '../common/Container';
import withInvestments from '../../containers/withInvestments';
import withUser from '../../containers/withUser';

const Replenish = ({ calculated }) => {
  return (
    <div className={styles.replenish}>
      <Container>
        <Calculator
          onDone={calculated}
        />
      </Container>
    </div>
  );
}

Replenish.defaultProps = {
};

Replenish.propTypes = {
  investments: PropTypes.array.isRequired,
  createInvestment: PropTypes.func.isRequired,
  calculated: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withInvestments(),
  withUser(),
  withHandlers({
    calculated: ({ userInfo }) => ({ amount, tariffId, billingSystem }) => {
      // createInvestment({ tariffId, billingSystemId, amount });
      window.location.href = `${process.env.REACT_APP_BILLING_DOMAIN}/hp/${amount}/${billingSystem.label.toLowerCase().replace(/ /g, '-')}/?userId=${userInfo.id}&tariffId=${tariffId}`;
      console.log(11, `${process.env.REACT_APP_BILLING_DOMAIN}/hp/${amount}/${billingSystem.label.toLowerCase().replace(/ /g, '-')}/?userId=${userInfo.id}&tariffId=${tariffId}`)
    }
  }),
  pure,
)(Replenish);
