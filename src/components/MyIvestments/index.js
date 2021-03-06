import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, lifecycle } from 'recompose';
import Tariff from '../common/Tariff';
import styles from './index.module.scss';
import Link from '../common/Link';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import TariffList from '../common/TariffList';
import withInvestments from '../../containers/withInvestments';
import { toFixedIfNeed } from '../../helpers/utils';


const MyIvestments = ({ translate, investments }) => {
  const completedInvestments = investments.filter(({ daysLeft }) => !daysLeft);
  const activeInvestments = investments.filter(({ daysLeft }) => daysLeft);
  return (
    <div className={styles.myInvestments}>
      <Container>
        <PageTitle>{translate('ISSUED_LOANS')}</PageTitle>
        {
          activeInvestments.length ? (
            <Fragment>
              <h3 className={styles.investmentsType}>{translate('ACTIVE_INVESTMENTS')}:</h3>
              <TariffList>
                {
                  activeInvestments.map((investment) => (
                    <Tariff
                      key={`investment-${investment.id}`}
                      tariffTitle={investment.tariff.name}
                      amount={`${investment.amount} $`}
                      tariffId={investment.tariff.id}
                      lines={[
                        {
                          label: translate('BORROWER_RELIABILITY'),
                          value: `${investment.reliability} %`,
                        },
                        {
                          label: translate('DAILY_PROFIT'),
                          value: `${toFixedIfNeed(investment.tariff.percentage / 100 * investment.amount)} $`,
                        },
                        {
                          label: translate('PROFIT_RECEIVED'),
                          value: `${toFixedIfNeed((investment.duration - investment.daysLeft) * (investment.tariff.percentage / 100 * investment.amount))} $`
                        },
                        {
                          label: translate('DAYS_TO_FINISH'),
                          value: `${investment.daysLeft}`,
                        },
                      ]}
                    />
                  ))
                }
              </TariffList>
            </Fragment>
          ) : null
        }
        {
          completedInvestments.length ? (
            <Fragment>
              <h3 className={styles.investmentsType}>{translate('COMPLETED_INVESTMENTS')}:</h3>
              <TariffList>
                {
                  completedInvestments.map((investment) => (
                    <Tariff
                      key={`investment-${investment.id}`}
                      tariffTitle={investment.tariff.name}
                      amount={`${investment.amount} $`}
                      completed
                      tariffId={investment.tariff.id}
                      lines={[
                        {
                          label: translate('BORROWER_RELIABILITY'),
                          value: `${investment.reliability} %`,
                        },
                        {
                          label: translate('DAILY_PROFIT'),
                          value: `${toFixedIfNeed(investment.tariff.percentage / 100 * investment.amount)} $`,
                        },
                        {
                          label: translate('PROFIT_RECEIVED'),
                          value: `${toFixedIfNeed(investment.duration * (investment.tariff.percentage / 100 * investment.amount))} $`
                        },
                      ]}
                    />
                  ))
                }
              </TariffList>
            </Fragment>
          ) : null
        }
        {
          (!activeInvestments.length && !completedInvestments.length) && (
            <div className={styles.emptyLabel}>{translate('NOTHING_YET')}. <Link to={{ pathname: '/cabinet/give-a-loan' }}>{translate('GIVE_A_LOAN')}</Link></div>
          )
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
