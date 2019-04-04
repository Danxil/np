import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Avatar, Card, List, Table, Icon, Button } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { compose, lifecycle, pure, defaultProps } from 'recompose';
import { Translate, withLocalize } from 'react-localize-redux';
import withWithdraws from '../../../containers/withWithdraws';
import withUser from '../../../containers/withUser';
import Spinner from '../Spinner';
import { DATE_FORMAT } from '../../../config';
import styles from './index.module.scss';

const getStatusLabel = (status) => {
  switch (status) {
    case 'done':
      return <div classNames={styles.greenColor}>
        <Icon type="check-circle-o" /> <span className="statusLabel"><Translate id="DONE" /></span>
      </div>;
    case 'inProgress':
      return <div>
        <Icon type="hourglass" /> <span className="statusLabel"><Translate id="IN_PROGRESS" /></span>
      </div>;
    case 'rejected':
      return <div classNames={styles.redColor}>
        <Icon type="close-circle-o" /> <span className="statusLabel"><Translate id="REJECTED" /></span>
      </div>;
  }
};

const Withdraws = ({ withdraws, maxItems, userInfo, completeWithdraw, translate }) => {
  const sortedWithdraws = _.sortBy(withdraws, 'createdAt').reverse().splice(0, maxItems);
  /* eslint-disable react/display-name */
  const COLUMNS = []
  .concat([
    {
      title: <Translate id="STATUS" />,
      dataIndex: 'status',
      key: 'status',
      render: text => getStatusLabel(text)
    },
    {
      title: <Translate id="AMOUNT" />,
      dataIndex: 'amount',
      key: 'amount',
      render: text => <Fragment>$ {text}</Fragment>
    },
    {
      title: <Translate id="DATE" />,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => <Fragment>{moment(text).format(DATE_FORMAT)}</Fragment>
    },
  ])
  .concat(
    userInfo.isAdmin ? [
      {
        title: <Translate id="USER" />,
        dataIndex: 'user',
        key: 'user',
        render: user => <Fragment><Avatar icon="user" src={user.photo} /><span>&nbsp;&nbsp;&nbsp;</span>{user.displayName}</Fragment>
      },
      {
        title: <Translate id="METHOD" />,
        dataIndex: 'method',
        key: 'method',
        render: method => method
      },
      {
        title: <Translate id="REQUISITE" />,
        dataIndex: 'requisite',
        key: 'requisite',
        render: requisite => requisite
      },
      {
        title: null,
        dataIndex: 'action',
        key: 'action',
        render: (text, item) => (
          <Button
            onClick={() => completeWithdraw({ withdrawId: item.id })}
            className="ghostBtn"
            type="primary"
            disabled={item.status !== 'inProgress'}
          >
            {translate('COMPLETE_WITHDRAW')}
          </Button>
        )
      },
    ] : []
  );
  /* eslint-enable react/display-name */
  return (
    <div className={styles.withdraws}>
      <Spinner spinnerKey="REST_API.GET_WITHDRAWS_REQUEST" overlay={true} transparentOverlay={true}>
        {
          !isMobile ? (
            <Table
              dataSource={sortedWithdraws}
              columns={COLUMNS}
              pagination={false}
              rowKey={(o) => o.createdAt}
              className={styles.table}
            />
          ) : (
            <List
              className={styles.widthrawsList}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
              dataSource={sortedWithdraws}
              renderItem={({ createdAt, amount, user: { displayName, photo } }) => (
                <List.Item>
                  <Card title={moment(createdAt).format(DATE_FORMAT)}>
                    <div className={styles.card}>
                      <Avatar icon="user" src={photo} className={styles.avatar} size="large" />
                      <div>
                        <p>{displayName}</p>
                        <span>$ {amount}</span>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          )
        }
      </Spinner>
    </div>
  );
};

Withdraws.propTypes = {
  withdraws: PropTypes.arrayOf(PropTypes.object).isRequired,
  getWithdraws: PropTypes.func.isRequired,
  completeWithdraw: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  filter: PropTypes.object,
  userInfo: PropTypes.object.isRequired,
  maxItems: PropTypes.number,
};
export default compose(
  defaultProps({
    maxItems: 10,
    filter: {},
  }),
  withWithdraws(),
  withUser(),
  lifecycle({
    componentDidMount () {
      this.props.getWithdraws({ filter: this.props.filter });
    },
  }),
  withLocalize,
  pure,
)(Withdraws);
