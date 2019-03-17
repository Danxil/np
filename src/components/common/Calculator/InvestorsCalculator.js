import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withState, withProps } from 'recompose';
import { Slider, Button, Icon } from 'antd';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import withTariffs from '../../../containers/withTariffs';
import { toFixedIfNeed, getReasignedSearchQuery } from '../../../helpers/utils';
import PageTitle from '../PageTitle';
import Container from '../Container';
import Tariff from '../Tariff';

const BILLING_SYSTEMS = [
  {
    label: 'PAYEER',
    image: 'payeer.png',
    id: 1,
  },
  // {
  //   label: 'PERFECT MONEY',
  //   image: 'perfect-money.png',
  //   id: 2,
  // },
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

const InvestorsCalculator = ({
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
    <div className={classNames(styles.tariffs, 'investmentPlans')}>
      <Container>
        <div className={styles.calculatorComp}>
          <PageTitle>{translate('INVESTMENT_PLANS')}</PageTitle>
          <div className={styles.tariffsList}>
            {
              tariffs.map((tariff) => (
                <Tariff
                  key={`tariff-${tariff.name}`}
                  tariffTitle={tariff.name}
                  amount={`${tariff.percentage} %`}
                  amountDescription={translate('DAILY_PROFIT')}
                  selected={tariffId === tariff.id}
                  onSelect={(id) => selectTariffId(id)}
                  tariffId={tariff.id}
                  lines={[
                    {
                      label: translate('BORROWERS_RELIABILITY'),
                      value: `${tariff.minReliability} % - ${tariff.maxReliability} %`,
                      info: translate(`${tariff.name}_BORROWERS_INFO`)
                    },
                    {
                      label: translate('LOAN_AMOUNT'),
                      value: `${tariff.minCredit} $ - ${tariff.maxCredit} $`
                    },
                    {
                      label: translate('LOAN_TIME'),
                      value: `${tariff.minDuration} - ${tariff.maxDuration} ${translate('DAYS').toLowerCase()}`,
                    },
                    {
                      label: translate('MINIMAL_INVESTMENT'),
                      value: `${tariff.minReplenishment} $`
                    },
                    {
                      label: translate('INSURANCE'),
                      value: !tariff.insurance ? '-' : <Icon type="check" />,
                      info: translate(`NON_RETURN_INSURANCE_INFO`)
                    },
                  ]}
                />
              ))
            }
          </div>
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
                    min={tariff.minReplenishment}
                    max={2000}
                    tipFormatter={(value) => (<span>{value}$</span>)}
                    value={amount}
                  />
                </div>
                <div className={styles.calcLine}>{translate('DAILY_PROFIT')}: {toFixedIfNeed(amount * (tariff.percentage * 0.01))} $</div>
                <div className={styles.calcLine}>{translate('INVETMENT_BODY_WILL_BE_RETURNED_AFTER_THE_END_OF_THE_LOAN_TIME')}</div>
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
                className={classNames(styles.calcBtn)}
                size="large"
              >
                {translate('MAKE_INVESTMENT')}
              </Button>
            </div>
          </div>
        </div>
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
  withProps(() => ({
    query: queryString.parse(location.search),
  })),
  withState('amount', 'setAmount', ({ tariff, query }) => {
    return parseInt(query.amount) || tariff.maxCredit
  }),
  withState('billingSystemId', 'setBillingSystemId', ({ query }) => {
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
      selectAmount(newTariff.minReplenishment);
    },
  })),
  withProps(({
    tariffId,
    amount,
    billingSystemId,
    history,
  }) => ({
    selectModelAndInvest() {
      history.push(`?${getReasignedSearchQuery({
        tariffId,
        amount,
        billingSystemId,
        showModal: 'sign-up',
      })}`);
    },
  })),
  pure,
)(InvestorsCalculator);

InvestorsCalculator.propTypes = {
  selectAmount: PropTypes.func.isRequired,
  selectTariffId: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  selectModelAndInvest: PropTypes.func.isRequired,
  setBillingSystemId: PropTypes.func.isRequired,
  tariffs: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  billingSystemId: PropTypes.number.isRequired,
  tariffId: PropTypes.number.isRequired,
  tariff: PropTypes.object.isRequired,
  billingSystem: PropTypes.object.isRequired,
};
