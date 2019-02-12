import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withState, withProps } from 'recompose';
import { withRouter } from 'react-router';
import styles from './Tariffs.module.scss';
import Calculator from '../common/Calculator';
import Container from '../common/Container';
import withTariffs from '../../containers/withTariffs';

const BILLING_SYSTEMS = [
  {
    label: 'PAYEER',
    image: 'payeer.png',
    id: 1,
  },
  {
    label: 'PERFECT MONEY',
    image: 'perfect-money.png',
    id: 2,
  },
  {
    label: 'ADV CASH',
    image: 'adv-cash.png',
    id: 3,
  },
  {
    label: 'FREE KASSA',
    image: 'free-kassa.png',
    id: 4,
  },
];

const Tariffs = ({
  selectModelAndInvest,
}) => {
  return (
    <div className={classNames(styles.tariffs, 'tariffsBlock')}>
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
  withState('tariffId', 'setTariffId', ({ tariffs }) => {
    const query = queryString.parse(location.search);
    return parseInt(query.tariffId) || tariffs[0].id;
  }),
  withProps(({ tariffId, tariffs }) => ({
    tariff: tariffs.find(o => o.id === tariffId),
  })),
  withState('amount', 'setAmount', ({ tariff }) => {
    const query = queryString.parse(location.search);
    return parseInt(query.amount) || tariff.minInvestment
  }),
  withState('billingSystemId', 'setBillingSystemId', () => {
    const query = queryString.parse(location.search);
    return parseInt(query.billingSystemId) || BILLING_SYSTEMS[0].id;
  }),
  withProps(({ billingSystemId }) => ({
    billingSystem: BILLING_SYSTEMS.find(o => o.id === billingSystemId),
  })),
  withProps(({ setAmount }) => ({
    selectAmount(amount) {
      setAmount(amount);
    },
  })),
  withProps(({ setTariffId, tariffs, selectAmount }) => ({
    selectTariffId(id) {
      const newTariff = tariffs.find(o => o.id === id);
      setTariffId(id);
      selectAmount(newTariff.minInvestment);
    },
  })),
  withProps(({ history }) => ({
    selectModelAndInvest({ tariffId, amount, billingSystemId }) {
      const query = queryString.parse(location.search);
      query.tariffId = tariffId;
      query.amount = amount;
      query.billingSystemId = billingSystemId;
      history.push(`/sign-up?${queryString.stringify(query)}`);
    },
  })),
  pure,
)(Tariffs);

Tariffs.propTypes = {
  selectModelAndInvest: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};
