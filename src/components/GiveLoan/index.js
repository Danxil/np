import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withState, withProps } from 'recompose';
import classNames from 'classnames';
import { Tabs, Icon, Tooltip, Button } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router';
import Link from '../common/Link';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withUser from '../../containers/withUser';
import withTariffs from '../../containers/withTariffs';
import withInvestments from '../../containers/withInvestments';
import LoansGenerator from './LoansGenerator';
import { getReasignedSearchQuery } from '../../helpers/utils';

const TabPane = Tabs.TabPane;

const GiveLoan = ({
  translate,
  tariffs,
  userInfo: { userBalances },
  setActiveTabKey,
  defaultActiveKey,
  activeTabKey,
  createInvestment,
}) => {
  return (
    <div className={styles.giveLoan}>
      <Container>
        <PageTitle>{translate('GIVE_A_LOAN')}</PageTitle>
         <Tabs
           defaultActiveKey={defaultActiveKey}
           onChange={setActiveTabKey}
         >
          {
            tariffs.map(tariff => {
              const tariffBalance = userBalances.find(i => i.tariffId === tariff.id).amount;
              const key = `tariffId${tariff.id}`;
              return (
                <TabPane tab={`${tariff.name} (${tariffBalance}$)`} key={key}>
                  {
                    activeTabKey === key && (
                      <Fragment>
                        <div className={classNames(styles.infoLine, styles.tabTitle)}>
                          <span className={styles.infoLabel}>
                            {translate('INVESTMENT_PLAN')}:
                          </span>&nbsp;
                          <span className={styles.infoValue}>
                            <Tooltip title={translate(`${tariff.name}_BORROWERS_INFO`)}>
                              {tariff.name} <Icon type="question-circle" className={styles.info} />
                            </Tooltip>
                          </span>
                        </div>
                        <div className={classNames(styles.infoLine, styles.tariffBalance)}>
                          <span className={styles.infoLabel}>
                            {translate('YOUR_BALANCE_IN_CURRENT_INVESTMENT_PLAN')}:
                          </span>&nbsp;
                          <span className={styles.infoValue}>
                            {tariffBalance}$
                          </span>
                          <div className={styles.plusBtn}>
                            <Link to={{ pathname: '/cabinet/', search: getReasignedSearchQuery({ tariffId: tariff.id }) }}>
                              <Button size="small" type="primary" >{translate('REPLENISH')}</Button>
                            </Link>
                          </div>
                        </div>
                        <div className={styles.infoLine}>
                          <span className={styles.infoLabel}>
                            {translate('BORROWERS_RELIABILITY')}:
                          </span>&nbsp;
                          <span className={styles.infoValue}>
                            {tariff.minReliability} % - {tariff.maxReliability} %
                          </span>
                        </div>
                        <div className={styles.infoLine}>
                          <span className={styles.infoLabel}>
                            {translate('LOAN_AMOUNT')}:
                          </span>&nbsp;
                          <span className={styles.infoValue}>
                            {tariff.minCredit}$ - {tariff.maxCredit}$
                          </span>
                        </div>
                        <div className={styles.infoLine}>
                          <span className={styles.infoLabel}>
                            {translate('LOAN_TIME')}:
                          </span>&nbsp;
                          <span className={styles.infoValue}>
                            {tariff.minDuration} - {tariff.maxDuration} {translate('DAYS').toLowerCase()}
                          </span>
                        </div>
                        <div className={styles.infoLine}>
                          <span className={styles.infoLabel}>
                            {translate('DAILY_PROFIT')}:
                          </span>&nbsp;
                          <span className={styles.infoValue}>
                            {tariff.percentage} %
                          </span>
                        </div>
                        <div className={classNames(styles.infoLine, styles.insurance)}>
                          <span className={styles.infoLabel}>
                            {translate('INSURANCE')}:
                          </span>&nbsp;
                          {
                            tariff.insurance ? (
                              <span className={styles.infoValue}>
                                <Tooltip title={translate('NON_RETURN_INSURANCE_INFO')}>
                                  <Icon type="check-circle" />
                                </Tooltip>
                              </span>
                            ) : (
                              <span>-</span>
                            )
                          }
                        </div>
                        <div className={styles.table}>
                          <LoansGenerator
                            {...tariff}
                            tariffBalance={tariffBalance}
                            onGiveLoan={createInvestment}
                          />
                        </div>
                      </Fragment>
                    )
                  }
                </TabPane>
              );
            })
          }
         </Tabs>
      </Container>
    </div>
  );
}

GiveLoan.defaultProps = {
};

GiveLoan.propTypes = {
  tariffs: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
  createInvestment: PropTypes.func.isRequired,
  setActiveTabKey: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  defaultActiveKey: PropTypes.string.isRequired,
  activeTabKey: PropTypes.string.isRequired,
};

export default compose(
  withLocalize,
  withRouter,
  withUser(),
  withTariffs(),
  withInvestments(),
  withProps(({ tariffs }) => ({
    defaultActiveKey: `tariffId${tariffs[0].id}`,
  })),
  withState('activeTabKey', 'setActiveTabKey', ({ defaultActiveKey }) => defaultActiveKey),
  pure,
)(GiveLoan);
