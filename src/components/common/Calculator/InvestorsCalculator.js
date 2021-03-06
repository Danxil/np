import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withState, withProps, lifecycle } from 'recompose';
import { Slider, Button, Icon, Switch } from 'antd';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import withUser from '../../../containers/withUser';
import withTariffs from '../../../containers/withTariffs';
import { toFixedIfNeed, getReasignedSearchQuery } from '../../../helpers/utils';
import PageTitle from '../PageTitle';
import Container from '../Container';
import Tariff from '../Tariff';
import TariffList from '../TariffList';

export const BILLING_SYSTEMS = [
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
    label: 'COIN PAYMENTS',
    image: 'coin-payments.png',
    id: 4,
  },
  {
    label: 'FREE KASSA',
    image: 'free-kassa.png',
    id: 5,
  },
]
const MIN_REINVEST_AMOUNT = 1;

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
  userInfo,
  reinvestProfitMode,
  setReinvestProfitMode,
}) => {
  return (
    <div className={classNames('investmentPlans')}>
      <Container>
        <div className={styles.calculatorComp}>
          <PageTitle>{translate('INVESTMENT_PLANS')}</PageTitle>
          <TariffList>
            {
              tariffs.map((tariff) => (
                <div key={`tariff-${tariff.name}`}>
                  <Tariff
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
                </div>
              ))
            }
          </TariffList>
          <div className={styles.calculator}>
            <div className={styles.content}>
              <div className={styles.sectionTitle}>
                {translate('SELECTED_INVESTMENT_PLAN')}: <span className={styles.sectionValue}>{tariff.name}</span>
              </div>
              <div className={styles.calcLines}>
                <div className={classNames(styles.calcLine, styles.sliderLine)}>
                  <div className={styles.sliderLabel}>
                    {translate('INVESTITION_AMOUNT')}: {amount}$
                  </div>
                  <Slider
                    step={reinvestProfitMode ? 1 : 5}
                    onChange={(value) => {selectAmount(value)}}
                    min={reinvestProfitMode ? MIN_REINVEST_AMOUNT : tariff.minReplenishment}
                    max={reinvestProfitMode ? userInfo.balance : 2000}
                    tipFormatter={(value) => (<span>{value}$</span>)}
                    value={amount}
                  />
                </div>
                <div className={styles.calcLine}>{translate('DAILY_PROFIT')}: {toFixedIfNeed(amount * (tariff.percentage * 0.01))} $</div>
                {
                  userInfo && (
                    <div className={styles.calcLine}>
                      {translate('CURRENT_BALANCE')}: {userInfo.userBalances.find(o => o.tariffId === tariff.id).amount} $
                    </div>
                  )
                }
                <div className={styles.calcLine}>{translate('INVETMENT_BODY_WILL_BE_RETURNED_AFTER_THE_END_OF_THE_LOAN_TIME')}</div>
                {
                  userInfo && (
                    <div className={styles.calcLine}>
                      {translate('REINVEST_PROFIT')} <Switch disabled={userInfo.balance < MIN_REINVEST_AMOUNT} checked={reinvestProfitMode} onChange={setReinvestProfitMode} />
                    </div>
                  )
                }
              </div>
              {
                !reinvestProfitMode && (
                  <Fragment>
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
                  </Fragment>
                )
              }
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
  withUser(),
  withTariffs(),
  withProps(() => ({
    query: queryString.parse(location.search),
  })),
  withState('reinvestProfitMode', 'setReinvestProfitMode', ({ userInfo }) => userInfo ? userInfo.balance >= MIN_REINVEST_AMOUNT : false),
  withState('tariffId', 'setTariffId', ({ query, tariffs }) => {
    const queryTariffId = parseInt(query.tariffId);
    return tariffs.find(o => o.id === queryTariffId) ? queryTariffId : tariffs[0].id;
  }),
  withProps(({ tariffId, tariffs }) => ({
    tariff: tariffs.find(o => o.id === tariffId),
  })),
  withState('amount', 'setAmount', ({ tariff, query, reinvestProfitMode }) => {
    return reinvestProfitMode ? MIN_REINVEST_AMOUNT : (parseInt(query.amount) || tariff.minReplenishment)
  }),
  withState('billingSystemId', 'setBillingSystemId', ({ query }) => {
    const queryBillingSystemId = parseInt(query.billingSystemId);
    return BILLING_SYSTEMS.find(o => o.id === queryBillingSystemId) ? queryBillingSystemId : BILLING_SYSTEMS[0].id;
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
    billingSystem,
    tariff,
    onDone,
    history,
    reinvestProfitMode,
  }) => ({
    selectModelAndInvest() {
      history.push(`?${getReasignedSearchQuery({
        tariffId,
        amount,
        billingSystemId,
        showModal: 'sign-up',
      })}`);
      onDone && onDone({ amount, tariffId, billingSystem, tariff, reinvestProfitMode });
    },
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (
        prevProps.userInfo &&
        this.props.userInfo &&
        prevProps.userInfo.balance !== this.props.userInfo.balance &&
        this.props.userInfo.balance < MIN_REINVEST_AMOUNT
      ) {
        this.props.setReinvestProfitMode(false);
      }
    }
  }),
  pure,
)(InvestorsCalculator);

InvestorsCalculator.defaultProps = {
  userInfo: null,
  onDone: () => {},
};
InvestorsCalculator.propTypes = {
  selectAmount: PropTypes.func.isRequired,
  selectTariffId: PropTypes.func.isRequired,
  onDone: PropTypes.func,
  translate: PropTypes.func.isRequired,
  setReinvestProfitMode: PropTypes.func.isRequired,
  reinvestProfitMode: PropTypes.bool.isRequired,
  reinvestProfit: PropTypes.func.isRequired,
  selectModelAndInvest: PropTypes.func.isRequired,
  setBillingSystemId: PropTypes.func.isRequired,
  tariffs: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  billingSystemId: PropTypes.number.isRequired,
  tariffId: PropTypes.number.isRequired,
  tariff: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  billingSystem: PropTypes.object.isRequired,
};
