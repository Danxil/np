import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tooltip, Affix, Progress, Modal, Icon, List, Card } from 'antd';
import { withLocalize } from 'react-localize-redux';
import Countdown from 'react-countdown-now';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import {
  isMobile
} from 'react-device-detect';
import { compose, pure, withHandlers, withState, lifecycle, withProps } from 'recompose';
import _ from 'lodash';
import styles from './LoansGenerator.module.scss';
import { toFixedIfNeed } from '../../helpers/utils';

const COLUMNS_AMOUNT = 50;
const MIN_DISABLE_RANDOM_LOAN_DELAY = 0;
const MAX_DISABLE_RANDOM_LOAN_DELAY = 7000;
const REFRESH_LOANS_LIST_DELAY = 60000;
let LOAN_START_ID = 0;
let timeout;

const LoansGenerator = ({
  loans,
  tariffBalance,
  translate,
  mountedTime,
  countdownCompleted,
  countdownRef,
  confirmGiveLoan,
}) => {
  const columns = [
    {
      title: <Tooltip title={translate('BORROWER_RELIABILITY_DESCRIPTION')}>{translate('BORROWER_RELIABILITY')}&nbsp;<Icon type="question-circle" className={styles.info} /></Tooltip>,
      dataIndex: 'reliability',
      key: 'reliability',
      render: (reliability) => `${reliability} %`
    },
    {
      title: <Tooltip title={translate('LOAN_AMOUNT_DESCRIPTION')}>{translate('LOAN_AMOUNT')}&nbsp;<Icon type="question-circle" className={styles.info} /></Tooltip>,
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => tariffBalance < amount ? (
        <Tooltip title={translate('LOW_BALANCE')}>
          <span className={classNames(styles.lowBalance)}>{amount} $</span>
        </Tooltip>
      ) : (
        <span>{amount} $</span>
      )
    },
    {
      title: <Tooltip title={translate('DAILY_PROFIT_DESCRIPTION')}>{translate('DAILY_PROFIT')}&nbsp;<Icon type="question-circle" className={styles.info} /></Tooltip>,
      dataIndex: 'dailyProfit',
      key: 'dailyProfit',
      render: (dailyProfit) => (<span>{dailyProfit} $</span>)
    },
    {
      title: <Tooltip title={translate('LOAN_DURATION_DESCRIPTION')}>{translate('LOAN_DURATION')}&nbsp;<Icon type="question-circle" className={styles.info} /></Tooltip>,
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => `${duration} ${translate(duration.toString()[duration.toString().length - 1] == 1 ? 'DAYS_1' : (duration.toString()[duration.toString().length - 1] <= 4 ? 'DAYS_2' : 'DAYS_3')).toLowerCase()}`,
    },
    {
      title: <Tooltip title={translate('NET_PROFIT_DESCRIPTION')}>{translate('NET_PROFIT')}&nbsp;<Icon type="question-circle" className={styles.info} /></Tooltip>,
      dataIndex: 'netProfit',
      key: 'netProfit',
      render: (netProfit) => (<span className={classNames(styles.profit)}>+ {netProfit} $</span>)
    },
    {
      title: null,
      dataIndex: 'action',
      key: 'action',
      render: (text, loan) => (
        <Fragment>
          {
            parseInt(loan.amount) > tariffBalance ? (
              <Tooltip title={translate('LOW_BALANCE')}>
                <Button size="small" disabled className="ghostBtn" type="primary">{translate('GIVE')}</Button>
              </Tooltip>
            ) : <Button onClick={() => confirmGiveLoan(loan)} className="ghostBtn" type="primary">{translate('GIVE')}</Button>
          }
          {
            loan.notAvailiable && (
              <div className={styles.notAvailiableOverlay}>
                {translate('LOAN_ALREADY_ISSUED')}...
              </div>
            )
          }
        </Fragment>
      ),
    }
  ];
  return (
    <Fragment>
      <Affix offsetTop={110}>
        <div className={styles.countdown}>
          <Countdown
            date={mountedTime + REFRESH_LOANS_LIST_DELAY}
            renderer={({ seconds }) => (
              <small>
                {translate('LIST_WILL_BE_UPDATED_IN')} {seconds} {translate('SEC').toLowerCase()} <Progress showInfo={false} percent={seconds * 1000 / REFRESH_LOANS_LIST_DELAY * 100} />
              </small>
            )}
            onComplete={countdownCompleted}
            ref={countdownRef}
            autoStart={false}
          />
        </div>
      </Affix>
      {
        !isMobile && (
          <Table dataSource={loans} columns={columns} pagination={false} />
        )
      }
      {
        isMobile && (
          <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
              dataSource={loans}
              renderItem={(loan) => (
                <List.Item>
                  <Card title={
                    <div className={styles.cardTitle}>{columns[columns.length - 1].render(loan[columns[columns.length - 1].dataIndex], loan)}</div>
                  }>
                    {
                      columns.map(column => (
                        <div className={styles.cardLine} key={`${column.key}${JSON.stringify(loan)}`}>
                          {
                            column.title && <Fragment>
                              <div>{column.title}</div>
                              <div>{column.render(loan[column.dataIndex], loan)}</div>
                            </Fragment>
                          }
                        </div>
                      ))
                    }
                  </Card>
                </List.Item>
              )}
            />
        )
      }
    </Fragment>
  );
}

LoansGenerator.defaultProps = {
};

LoansGenerator.propTypes = {
  loans: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
  onGiveLoan: PropTypes.func.isRequired,
  confirmGiveLoan: PropTypes.func.isRequired,
  removeDisabledLoans: PropTypes.func.isRequired,
  countdownCompleted: PropTypes.func.isRequired,
  tariffBalance: PropTypes.number.isRequired,
  mountedTime: PropTypes.number.isRequired,
  countdownRef: PropTypes.object.isRequired,
};

export default compose(
  withLocalize,
  withRouter,
  withProps({
    countdownRef: React.createRef(),
  }),
  withHandlers({
    generateLoan: ({
      maxReliability,
      minReliability,
      minCredit,
      maxCredit,
      minDuration,
      maxDuration,
      percentage,
      id: tariffId,
    }) => () => {
      const amount = Math.ceil(_.random(minCredit, maxCredit) / 5) * 5;
      const duration = _.random(minDuration, maxDuration);
      const id = ++LOAN_START_ID;
      return ({
        reliability: _.random(minReliability, maxReliability),
        amount,
        duration,
        dailyProfit: toFixedIfNeed(amount * (percentage / 100)),
        netProfit: toFixedIfNeed(amount * (percentage / 100) * duration),
        tariffId,
        key: `loan${id}`,
        notAvailiable: false,
        id,
      });
    },
  }),
  withState(
    'loans',
    'setLoans',
    ({ generateLoan }) => new Array(COLUMNS_AMOUNT).fill(0).map((i, index) => generateLoan(index))
  ),
  withState(
    'mountedTime',
    'setMountedTime',
    () => Date.now(),
  ),
  withHandlers({
    removeDisabledLoans: ({ loans, setLoans }) => () => {
      setLoans([...loans].filter(o => !o.notAvailiable));
    },
  }),
  withHandlers({
    countdownCompleted: ({ removeDisabledLoans, setMountedTime, countdownRef }) => () => {
      removeDisabledLoans();
      setMountedTime(Date.now());
      countdownRef.current.start();
    },
  }),
  withHandlers({
    disableRandomLoan: ({ loans, setLoans, generateLoan }) => () => {
      const loan = _.sample(loans.filter(o => !o.notAvailiable));
      if (!loan) return;
      loan.notAvailiable = true;
      setLoans([...loans, generateLoan()]);
    },
    confirmGiveLoan: ({ translate, onGiveLoan, id: tariffId, }) => ({
      amount,
      reliability,
      duration,
      dailyProfit,
      netProfit,
    }) => {
      Modal.confirm({
        title: translate('GIVE_A_LOAN_CONFIRMATION_TEXT'),
        okText: translate('YES'),
        cancelText: translate('CANCEL'),
        content: (
          <Fragment>
            <div className={styles.loanConfirmationLine}>
              {translate('BORROWER_RELIABILITY')}: <span className={styles.loanConfirmationValue}>{reliability} %</span>
            </div>
            <div className={styles.loanConfirmationLine}>
              {translate('LOAN_AMOUNT')}: <span className={styles.loanConfirmationValue}>{amount} $</span>
            </div>
            <div className={styles.loanConfirmationLine}>
              {translate('LOAN_DURATION')}: <span className={styles.loanConfirmationValue}>{duration} {translate(duration.toString()[duration.toString().length - 1] == 1 ? 'DAYS_1' : (duration.toString()[duration.toString().length - 1] <= 4 ? 'DAYS_2' : 'DAYS_3')).toLowerCase()}</span>
            </div>
            <div className={styles.loanConfirmationLine}>
              {translate('DAILY_PROFIT')}: <span className={styles.loanConfirmationValue}>{dailyProfit} $</span>
            </div>
            <div className={styles.loanConfirmationLine}>
              {translate('NET_PROFIT')}: <span className={styles.loanConfirmationValue}>{netProfit} $</span>
            </div>
          </Fragment>
        ),
        onOk() {
          onGiveLoan({ amount, duration, tariffId, reliability });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const self = this;
      function runInterval() {
        self.props.disableRandomLoan();
        timeout = setTimeout(() => {
          runInterval();
        }, _.random(MIN_DISABLE_RANDOM_LOAN_DELAY, MAX_DISABLE_RANDOM_LOAN_DELAY));
      }
      runInterval();
      this.props.countdownRef.current.start();
    },
    componentWillUnmount() {
      clearTimeout(timeout);
    }
  }),
  pure,
)(LoansGenerator);
