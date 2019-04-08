import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Card, List, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { compose, pure } from 'recompose';
import { Translate, withLocalize } from 'react-localize-redux';
import { DATE_FORMAT } from '../../../config';
import styles from './index.module.scss';


const Withdraws = ({ replenishments }) => {
  const sortedReplenishments = _.sortBy(replenishments, 'createdAt').reverse();
  /* eslint-disable react/display-name */
  const COLUMNS = [
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
  ];
  /* eslint-enable react/display-name */
  return (
    <div className={styles.withdraws}>
      {
        !isMobile ? (
          <Table
            dataSource={sortedReplenishments}
            columns={COLUMNS}
            pagination={false}
            rowKey={(o) => o.createdAt}
            className={styles.table}
          />
        ) : (
          <List
            className={styles.widthrawsList}
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
            dataSource={sortedReplenishments}
            renderItem={({ createdAt, amount }) => (
              <List.Item>
                <Card title={moment(createdAt).format(DATE_FORMAT)}>
                  <div className={styles.card}>
                    <div>
                      <span>$ {amount}</span>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )
      }
    </div>
  );
};

Withdraws.propTypes = {
  replenishments: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
  filter: PropTypes.object,
  userInfo: PropTypes.object.isRequired,
  maxItems: PropTypes.number,
};
export default compose(
  withLocalize,
  pure,
)(Withdraws);
