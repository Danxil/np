import React from 'react';
import PropTypes from 'prop-types';
import { InvestorsCalculator } from '../common/Calculator';
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
        <InvestorsCalculator
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
    calculated: ({ userInfo, reinvestProfit }) => ({ amount, tariffId, billingSystem, tariff, reinvestProfitMode }) => {
      if (!reinvestProfitMode) {
        window.location = `${process.env.REACT_APP_BILLING_DOMAIN}hp/${amount}/${billingSystem.label.toLowerCase().replace(/ /g, '-')}/?userId=${userInfo.id}&tariffId=${tariffId}&comment=Тариф "${tariff.name}"`;
      } else {
        reinvestProfit({ amount, tariffId });
      }
    }
  }),
  pure,
)(Replenish);
