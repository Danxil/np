import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { withLocalize, Translate } from 'react-localize-redux';
import { withRouter } from 'react-router';
import { compose, pure, withHandlers, withState } from 'recompose';
import _ from 'lodash';
import { toFixedIfNeed } from '../../helpers/utils';

const COLUMNS_AMOUNT = 50;

const columns = [
  {
    title: <Translate id="BORROWER_RELIABILITY" />,
    dataIndex: 'reliability',
    key: 'reliability',
  },
  {
    title: <Translate id="LOAN_AMOUNT" />,
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: <Translate id="LOAN_DURATION" />,
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: <Translate id="DAILY_PROFIT" />,
    dataIndex: 'dailyProfit',
    key: 'dailyProfit',
  },
  {
    title: <Translate id="NET_PROFIT" />,
    dataIndex: 'netProfit',
    key: 'netProfit',
  },
  {
    title: null,
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <Button className="ghostBtn" type="primary"><Translate id="GIVE" /></Button>
    ),
  }
];


const LoansGenerator = ({ loans }) => {
  return (
    <Table dataSource={loans} columns={columns} pagination={false} />
  );
}

LoansGenerator.defaultProps = {
};

LoansGenerator.propTypes = {
  loans: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
};

export default compose(
  withLocalize,
  withRouter,
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
      translate,
    }) => (index) => {
      const amount = Math.ceil(_.random(minCredit, maxCredit) / 5) * 5;
      const duration = _.random(minDuration, maxDuration);
      return ({
        reliability: `${_.random(minReliability, maxReliability)} %`,
        amount: `${amount} $`,
        duration: `${duration} ${translate(duration.toString()[duration.toString().length - 1] == 1 ? 'DAYS_1' : (duration.toString()[duration.toString().length - 1] <= 4 ? 'DAYS_2' : 'DAYS_3')).toLowerCase()}`,
        dailyProfit: `${toFixedIfNeed(percentage * (amount / 100))} $`,
        netProfit: `${toFixedIfNeed(percentage * (amount / 100) * duration)} $`,
        tariffId,
        key: `loan${index}`,
      });
    },
  }),
  withState(
    'loans',
    'setLoans',
    ({ generateLoan }) => new Array(COLUMNS_AMOUNT).fill(0).map((i, index) => generateLoan(index))),
  pure,
)(LoansGenerator);
