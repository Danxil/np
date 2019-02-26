import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withState, withProps } from 'recompose';
import { Slider, Button } from 'antd';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import TariffList from '../TariffList';
import withTariffs from '../../../containers/withTariffs';
import { toFixedIfNeed } from '../../../helpers/utils';
import PageTitle from '../PageTitle';

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
]

const Calculator = ({
  translate,
  tariffs,
  amount,
  tariffId,
  selectAmount,
  selectTariffId,
  tariff,
  billingSystemId,
  setBillingSystemId,
  billingSystem,
  selectModelAndInvest,
}) => {
  return (
    <div className={styles.calculatorComp}>
      <PageTitle>{translate('TARIFFS')}</PageTitle>
      <TariffList
        tariffs={tariffs}
        selectedId={tariffId}
        onSelect={(id) => selectTariffId(id)}
      />
      <div className={styles.calculator}>
        <div className={styles.content}>
          <div className={styles.sectionTitle}>
            {translate('SELECTED_TARIFF')}: <span className={styles.sectionValue}>{tariff.name}</span>
          </div>
          <div className={styles.calcLines}>
            <div className={classNames(styles.calcLine, styles.sliderLine)}>
              <div className={styles.sliderLabel}>
                {translate('INVESTITION_AMOUNT')}: {amount}$
              </div>
              <Slider
                step={5}
                onChange={(value) => {selectAmount(value)}}
                min={tariff.minInvestment}
                max={2000}
                tipFormatter={(value) => (<span>{value}$</span>)}
                value={amount}
              />
            </div>
            <div className={styles.calcLine}>{translate('INVESTITION_DURATION')}: {tariff.duration} <span className={styles.durationLabel}>{translate('DAYS')}</span></div>
            <div className={styles.calcLine}>{translate('DAILY_PROFIT')}: {toFixedIfNeed(amount * (tariff.percentage * 0.01))} $</div>
            <div className={styles.calcLine}>{translate('TOTAL_NET_PROFIT')}: {toFixedIfNeed(amount * (tariff.percentage * 0.01) * tariff.duration)} $</div>
            <div className={styles.calcLine}>{translate('INVETMENT_BODY_WILL_BE_RETURNED_AFTER_THE_END_OF_THE_INVESTMENT')}</div>
          </div>
          <div className={styles.sectionTitle}>
            {translate('PAYMENT_SYSTEM')}: <span className={styles.sectionValue}>{billingSystem.label}</span>
          </div>
          <div className={styles.billingSystems}>
            {
              BILLING_SYSTEMS.map((billingSystem) => (
                <div
                  key={billingSystem.label}
                  className={classNames(styles.billingSystem, { [styles.selected]: billingSystem.id === billingSystemId })}
                  onClick={() => { setBillingSystemId(billingSystem.id) }}
                >
                  <img className={styles.billingSystemImage} src={`/${billingSystem.image}`} />
                </div>
              ))
            }
          </div>
          <Button
            onClick={() => selectModelAndInvest()}
            type="primary"
            className={classNames('ghostBtn', styles.calcBtn)}
            size="large"
          >
            {translate('MAKE_INVESTMENT')}
          </Button>
        </div>
      </div>
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
  withProps(({
    tariffId,
    amount,
    billingSystemId,
    onDone,
    tariff,
    billingSystem
  }) => ({
    selectModelAndInvest() {
      onDone({ tariff, tariffId, billingSystem, billingSystemId,  amount });
    },
  })),
  pure,
)(Calculator);

Calculator.propTypes = {
  selectAmount: PropTypes.func.isRequired,
  selectTariffId: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  selectModelAndInvest: PropTypes.func.isRequired,
  setBillingSystemId: PropTypes.func.isRequired,
  tariffs: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  billingSystemId: PropTypes.number.isRequired,
  tariffId: PropTypes.number.isRequired,
  tariff: PropTypes.object.isRequired,
  billingSystem: PropTypes.object.isRequired,
};
