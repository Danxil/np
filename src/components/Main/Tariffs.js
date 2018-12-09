import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import { Slider, Button } from 'antd';
import styles from './Tariffs.module.scss';
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import TariffList from '../common/TariffList';

const TARIFFS = [
  {
    title: 'BEGINNER',
    percentage: 1,
    duration: 7,
    minInvestition: 10,
  },
  {
    title: 'BASE',
    percentage: 2,
    duration: 14,
    minInvestition: 300,
  },
  {
    title: 'ADVANCED',
    percentage: 4,
    duration: 35,
    minInvestition: 1000,
  },
];
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
}) => {
  return (
    <div className={styles.tariffs}>
      <PageTitle>{translate('TARIFS')}</PageTitle>
      <Container>
        <TariffList
          tariffs={TARIFFS}
          renderDescription={
            ({ percentage, duration, minInvestition }) => (<div className={styles.description}>
              <div className={styles.percentage}>{percentage}%</div>
              <div className={styles.model}>{translate('DAILY_PAYMENTS')}</div>
              <div className={styles.descriptionLine}>{translate('INVESTITION_DURATION')}: {duration} <span className={styles.durationLabel}>{translate('DAYS')}</span></div>
              <div className={styles.descriptionLine}>{translate('MINIMAL_INVESTITION')}: {minInvestition}$</div>
              <div className={styles.descriptionLine}>{translate('NET_PROFIT')}: {duration * percentage}%</div>
            </div>
            )
          }
          />
        <div className={styles.calculator}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              {translate('SELECTED_TARIFF')}: <span className={styles.sectionValue}>base</span>
            </div>
            <div className={styles.calcLines}>
              <div className={classNames(styles.calcLine, styles.sliderLine)}>
                <div className={styles.sliderLabel}>
                  {translate('INVESTITION_AMOUNT')}: 200$
                </div>
                <Slider
                  step={100}
                  tipFormatter={(value) => (<span>{value}$</span>)}
                  value={1}
                />
              </div>
              <div className={styles.calcLine}>{translate('INVESTITION_DURATION')}: {20} <span className={styles.durationLabel}>{translate('DAYS')}</span></div>
              <div className={styles.calcLine}>{translate('DAILY_PROFIT')}: {2}$</div>
              <div className={styles.calcLine}>{translate('TOTAL_NET_PROFIT')}: {20}$</div>
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
              {translate('MAKE_INVESTMENT')}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(Tariffs);

Tariffs.propTypes = {
  translate: PropTypes.func.isRequired,
};
