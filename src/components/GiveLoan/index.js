import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import classNames from 'classnames';
import { Tabs, Icon, Tooltip, Button } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withUser from '../../containers/withUser';
import withTariffs from '../../containers/withTariffs';
import LoansGenerator from './LoansGenerator';

const TabPane = Tabs.TabPane;

const GiveLoan = ({ translate, tariffs, userInfo: { userBalances } }) => {
  return (
    <div className={styles.giveLoan}>
      <Container>
        <PageTitle>{translate('GIVE_A_LOAN')}</PageTitle>
         <Tabs
           defaultActiveKey={`tariffId${tariffs[0].id}`}
         >
          {
            tariffs.map(tariff => {
                const tariffBalance = userBalances.find(i => i.tariffId === tariff.id).amount;
                return (
                  <TabPane tab={`${tariff.name} (${tariffBalance}$)`} key={`tariffId${tariff.id}`}>
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
                        <div className={styles.plusBtn}>
                          <Button size="small" type="primary" >{translate('REPLENISH')}</Button>
                        </div>
                      </span>
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
                      <LoansGenerator {...tariff} />
                    </div>
                  </TabPane>);
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
  userInfo: PropTypes.object.isRequired,
};

export default compose(
  withLocalize,
  withRouter,
  withUser(),
  withTariffs(),
  withHandlers({
  }),
  pure,
)(GiveLoan);
