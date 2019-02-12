import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import Tariff from '../common/Tariff';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';

const MyIvestments = ({ translate }) => {
  return (
    <div className={styles.myInvestments}>
      <Container>
        <PageTitle>{translate('MY_INVESTMENTS')}</PageTitle>
        <h3 className={styles.investmentsType}>{translate('ACTIVE_INVESTMENTS')}:</h3>
        <div className={styles.investments}>
          <Tariff
            tariffTitle="Base"
            amount="200$"
            lines={[
              {
                label: translate('DAILY_PROFIT'),
                value: '5%',
              },
              {
                label: translate('DAYS_TO_FINISH'),
                value: '7'
              },
              {
                label: translate('PROFIT_RECEIVED'),
                value: '10$'
              },
            ]}
          />
        </div>
        <h3 className={styles.investmentsType}>{translate('COMPLETED_INVESTMENTS')}:</h3>
        <div className={styles.investments}>
          <Tariff
            tariffTitle="Base"
            amount="200$"
            completed
            lines={[
              {
                label: translate('DAILY_PROFIT'),
                value: '5%',
              },
              {
                label: translate('PROFIT_RECEIVED'),
                value: '10$'
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
}

MyIvestments.defaultProps = {
  userData: null,
};

MyIvestments.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default compose(
  withLocalize,
  pure,
)(MyIvestments);
