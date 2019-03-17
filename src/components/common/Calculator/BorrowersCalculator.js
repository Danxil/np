import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import classNames from 'classnames';
import { withLocalize, Translate } from 'react-localize-redux';
import { compose, pure, withState, withProps } from 'recompose';
import { Slider, Button, Form, Input } from 'antd';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import withTariffs from '../../../containers/withTariffs';
import withBusinessConfig from '../../../containers/withBusinessConfig';
import { getReasignedSearchQuery, toFixedIfNeed } from '../../../helpers/utils';
import PageTitle from '../PageTitle';
import Container from '../Container';
import Tariff from '../Tariff';

const FormItem = Form.Item;

const BILLING_SYSTEMS = [
  {
    label: 'VISA/MASTERCARD',
    image: 'visa-mastercard.jpg',
    id: 1,
  },
  {
    label: 'PAYEER',
    image: 'payeer.png',
    id: 2,
  },
  {
    label: 'PERFECT MONEY',
    image: 'perfect-money.png',
    id: 3,
  },
  {
    label: 'ADV CASH',
    image: 'adv-cash.png',
    id: 4,
  },
]

const BorrowersCalculator = ({
  translate,
  tariffs,
  amount,
  setAmount,
  billingSystemId,
  setBillingSystemId,
  billingSystem,
  selectModelAndInvest,
  tariffId,
  tariff,
  duration,
  setDuration,
  businessConfig: { COMISSION_PERCENTAGE },
  form: { getFieldDecorator },
  query,
}) => {
  return (
    <div className={classNames(styles.tariffs, 'investmentPlans')}>
      <Container>
        <div className={styles.calculatorComp}>
          <PageTitle>{translate('BORROWER_LEVELS')}</PageTitle>
          <div className={styles.borrowerLevelsDescription}>{translate('BORROWER_LEVELS_DESCRIPTION')}</div>
          <div className={styles.tariffsList}>
            {
              tariffs.map((tariff) => (
                <Tariff
                  key={`tariff-${tariff.name}`}
                  selected={tariffId === tariff.id}
                  tariffTitle={tariff.name}
                  amount={`${tariff.percentage + COMISSION_PERCENTAGE} %`}
                  amountDescription={translate('DAILY_PERCENTAGE_RATE')}
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
                  ]}
                />
              ))
            }
          </div>
          <div className={styles.calculator}>
            <div className={styles.content}>
              <div className={styles.calcLines}>
                <div className={classNames(styles.calcLine, styles.sliderLine)}>
                  <div className={styles.sliderLabel}>
                    {translate('LOAN_AMOUNT')}: {amount}$
                  </div>
                  <Slider
                    step={1}
                    onChange={(value) => {setAmount(value)}}
                    min={tariff.minCredit}
                    max={tariff.maxCredit}
                    tipFormatter={(value) => (<span>{value}$</span>)}
                    value={amount}
                  />
                </div>
                <div className={classNames(styles.calcLine, styles.sliderLine)}>
                  <div className={styles.sliderLabel}>
                    {translate('LOAN_DURATION')}: {duration} {translate('DAYS')}
                  </div>
                  <Slider
                    step={5}
                    onChange={(value) => {setDuration(value)}}
                    min={tariff.minDuration}
                    max={tariff.maxDuration}
                    tipFormatter={(value) => (<span>{value} {translate('DAYS')}</span>)}
                    value={duration}
                  />
                </div>
                <div className={styles.calcLine}>{translate('DAILY_PERCENTAGE_RATE')}: {toFixedIfNeed(
                  (amount * ((tariff.percentage + COMISSION_PERCENTAGE) / 100))
                )} $</div>
                <div className={styles.calcLine}>{translate('AMOUNT_TO_RETURN')}: {toFixedIfNeed(
                  amount + duration * (amount * ((tariff.percentage + COMISSION_PERCENTAGE) / 100))
                )} $</div>
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

              <div className={styles.form}>
                <div className={styles.sectionTitle}>
                  {translate('CARD_OR_ACCOUNT_NUMBER')}
                </div>
                <Form>
                  <FormItem>
                    {getFieldDecorator('accountNumber', {
                      rules: [
                        { required: true, message: <Translate id={'PLEASE_FILL_THIS_FIELD'} />},
                      ],
                      initialValue: query.accountNumber || ''
                    })(
                      <Input placeholder={translate('CARD_OR_ACCOUNT_NUMBER')} />
                    )}
                  </FormItem>
                </Form>
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
  Form.create(),
  withLocalize,
  withRouter,
  withTariffs(),
  withBusinessConfig(),
  withState('tariffId', 'setTariffId', ({ tariffs }) => {
    return tariffs[0].id;
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
  withState('duration', 'setDuration', ({ tariff, query }) => {
    return parseInt(query.duration) || tariff.maxDuration
  }),
  withState('billingSystemId', 'setBillingSystemId', ({ query }) => {
    return parseInt(query.billingSystemId) || BILLING_SYSTEMS[0].id;
  }),
  withProps(({ billingSystemId }) => ({
    billingSystem: BILLING_SYSTEMS.find(o => o.id === billingSystemId),
  })),
  withProps(({ setTariffId, tariffs, setAmount }) => ({
    selectTariffId(id) {
      const newTariff = tariffs.find(o => o.id === id);
      setTariffId(id);
      setAmount(newTariff.minReplenishment);
    },
  })),
  withProps(({
    amount,
    billingSystemId,
    history,
    duration,
    form: { validateFields }
  }) => ({
    selectModelAndInvest() {
      validateFields((err, values) => {
        if (!err) {
          history.push(`?${getReasignedSearchQuery({
            amount,
            duration,
            billingSystemId,
            showModal: 'sign-up',
            accountNumber: values.accountNumber,
          })}`);
        }
      });
    },
  })),
  pure,
)(BorrowersCalculator);

BorrowersCalculator.propTypes = {
  setAmount: PropTypes.func.isRequired,
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
  businessConfig: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  duration: PropTypes.number.isRequired,
  setDuration: PropTypes.func.isRequired,
};
