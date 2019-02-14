import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, lifecycle } from 'recompose';
import Tariff from '../common/Tariff';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withInvestments from '../../containers/withInvestments';

const MyIvestments = ({ translate, investments }) => {
  const completedInvestments = investments.filter(({ daysLeft }) => !daysLeft);
  const activeInvestments = investments.filter(({ daysLeft }) => daysLeft);
  return (
    <div className={styles.myInvestments}>
      <Container>
        <PageTitle>{translate('MY_INVESTMENTS')}</PageTitle>
        <h3 className={styles.investmentsType}>{translate('ACTIVE_INVESTMENTS')}:</h3>
        <div className={styles.investments}>
          {
            activeInvestments.map((investment) => (
              <Tariff
                key={`investment-${investment.id}`}
                tariffTitle={investment.tariff.name}
                amount={`${investment.amount} $`}
                lines={[
                  {
                    label: translate('DAILY_PROFIT'),
                    value: `${investment.tariff.percentage} %`,
                  },
                  {
                    label: translate('PROFIT_RECEIVED'),
                    value: `${(investment.tariff.duration - investment.daysLeft) * (investment.tariff.percentage * investment.amount)} $`
                  },
                  {
                    label: translate('DAYS_TO_FINISH'),
                    value: `${investment.daysLeft}`,
                  },
                ]}
              />
            ))
          }
        </div>
        {
          completedInvestments.length ? (
            <Fragment>
              <h3 className={styles.investmentsType}>{translate('COMPLETED_INVESTMENTS')}:</h3>
              <div className={styles.investments}>
                {
                  completedInvestments.map((investment) => (
                    <Tariff
                      key={`investment-${investment.id}`}
                      tariffTitle="Base"
                      amount="200$"
                      completed
                      lines={[
                        {
                          label: translate('DAILY_PROFIT'),
                          value: `${investment.tariff.percentage} %`,
                        },
                        {
                          label: translate('PROFIT_RECEIVED'),
                          value: `${investment.tariff.duration * (investment.tariff.percentage * investment.amount)} $`
                        },
                      ]}
                    />
                  ))
                }
              </div>
            </Fragment>
          ) : null
        }
      </Container>
    </div>
  );
}

MyIvestments.defaultProps = {
  userData: null,
};

MyIvestments.propTypes = {
  translate: PropTypes.func.isRequired,
  investments: PropTypes.array.isRequired,
};

export default compose(
  withInvestments(),
  withLocalize,
  lifecycle({
    componentDidMount() {
      this.props.getInvestments();
    }
  }),
  pure,
)(MyIvestments);
