import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import styles from './InvestmentPlans.module.scss';
import Calculator from '../common/Calculator';
import Container from '../common/Container';
import withTariffs from '../../containers/withTariffs';
import { getReasignedSearchQuery } from '../../helpers/utils';

const InvestmentPlans = ({
  selectModelAndInvest,
}) => {
  return (
    <div className={classNames(styles.tariffs, 'investmentPlans')}>
      <Container>
        <Calculator
          onDone={(args) => {
            selectModelAndInvest(args);
          }}
        />
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  withRouter,
  withTariffs(),
  withProps(({ history }) => ({
    selectModelAndInvest({ tariffId, amount, billingSystemId }) {
      history.push(`?${getReasignedSearchQuery({
        tariffId,
        amount,
        billingSystemId,
        showModal: 'sign-up',
      })}`);
    },
  })),
  pure,
)(InvestmentPlans);

InvestmentPlans.propTypes = {
  selectModelAndInvest: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};
