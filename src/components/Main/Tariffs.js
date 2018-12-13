import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withState, withProps } from 'recompose';
import { Slider, Button } from 'antd';
import styles from './Tariffs.module.scss';
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import TariffList from '../common/TariffList';
import Link from '../common/Link';
import withTariffs from '../../containers/withTariffs';
import { toFixedIfNeed } from '../../helpers/utils';

const BILLING_SYSTEMS = [
  {
    label: 'PAYEER',
    image: 'payeer.png',
  },
  {
    label: 'PERFECT MONEY',
    image: 'perfect-money.png',
  },
  {
    label: 'ADV CASH',
    image: 'adv-cash.png',
  },
  {
    label: 'FREE KASSA',
    image: 'free-kassa.png',
  },
]

const Tariffs = ({
  translate,
  tariffs,
  amount,
  tariffId,
  selectAmount,
  selectTariffId,
  tariff,
}) => {
  return (
    <div className={classNames(styles.tariffs, 'tariffsBlock')}>
      <PageTitle>{translate('TARIFFS')}</PageTitle>
      <Container>
        <TariffList
          tariffs={tariffs}
          selectedId={tariffId}
          renderDescription={
            ({ percentage, duration, minInvestment }) => (<div className={styles.description}>
              <div className={styles.percentage}>{percentage}%</div>
              <div className={styles.model}>{translate('DAILY_PAYMENTS')}</div>
              <div className={styles.descriptionLine}>{translate('INVESTITION_DURATION')}: {duration} <span className={styles.durationLabel}>{translate('DAYS')}</span></div>
              <div className={styles.descriptionLine}>{translate('MINIMAL_INVESTITION')}: {minInvestment}$</div>
              <div className={styles.descriptionLine}>{translate('TOTAL_NET_PROFIT')}: {duration * percentage}%</div>
            </div>
            )
          }
          onSelect={({ id }) => selectTariffId(id)}
        />
        <div className={styles.calculator}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              {translate('SELECTED_TARIFF')}: <span className={styles.sectionValue}>base</span>
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
              <div className={styles.calcLine}>{translate('DAILY_PROFIT')}: {toFixedIfNeed(amount * (tariff.percentage * 0.01))}$</div>
              <div className={styles.calcLine}>{translate('TOTAL_NET_PROFIT')}: {toFixedIfNeed(amount * (tariff.percentage * 0.01) * tariff.duration)}$</div>
              <div className={styles.calcLine}>{translate('INVETMENT_BODY_WILL_BE_RETURNED_AFTER_THE_END_OF_THE_INVESTMENT')}</div>
            </div>
            <div className={styles.sectionTitle}>
              {translate('PAYMENT_SYSTEM')}: <span className={styles.sectionValue}>Payeer</span>
            </div>
            <div className={styles.billingSystems}>
              {
                BILLING_SYSTEMS.map(({ label, image }, index) => (
                  <div key={label} className={classNames(styles.billingSystem, { [styles.selected]: index === 1 })}>
                    <img className={styles.billingSystemImage} src={`./${image}`} />
                  </div>
                ))
              }
            </div>
            <Button
              type="primary"
              className={classNames('ghostBtn', styles.calcBtn)}
              size="large"
            >
              <Link to={{ pathname: '/sign-up' }}>{translate('MAKE_INVETMENT')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  withTariffs(),
  withState('tariffId', 'setTariffId', ({ tariffs }) => {
    return tariffs[0].id;
  }),
  withProps(({ tariffId, tariffs }) => ({
    tariff: tariffs.find(o => o.id === tariffId),
  })),
  withState('amount', 'setAmount', ({ tariff }) => tariff.minInvestment),
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
  pure,
)(Tariffs);

Tariffs.propTypes = {
  selectAmount: PropTypes.func.isRequired,
  selectTariffId: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  tariffs: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  tariffId: PropTypes.number.isRequired,
  tariff: PropTypes.object.isRequired,
};
