import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers, lifecycle } from 'recompose';
import { isMobile } from 'react-device-detect';
import { Input, Table, List, Card } from 'antd';
import { withRouter } from 'react-router';
import { withLocalize, Translate } from 'react-localize-redux';
import styles from './index.module.scss';
import Container from '../common/Container';
import Spinner from '../common/Spinner';
import PageTitle from '../common/PageTitle';
import withUser from '../../containers/withUser';
import withBusinessConfig from '../../containers/withBusinessConfig';

const getColumns = ({ USER_REFERENCE_PERCENTAGE }) => [
  {
    title: <Translate id="USER" />,
    dataIndex: 'displayName',
    key: 'displayName',
    render: text => <Fragment>{text}</Fragment>
  },
  {
    title: <Translate id="REVENUE" />,
    dataIndex: 'totalInvested',
    key: 'totalInvested',
    render: totalInvested => <Fragment>$ {totalInvested * (USER_REFERENCE_PERCENTAGE / 100)}</Fragment>
  },
];

const ForPartners = ({
  translate,
  userInfo: { id, displayName, referrals },
  businessConfig: { USER_REFERENCE_PERCENTAGE },
}) => {
  return (
    <div className={styles.forPartners}>
      <Container>
        <PageTitle>{translate('FOR_PARTNERS')}</PageTitle>
        <div className={styles.content}>
          <h3 className={styles.bonus}>{translate('BONUS_FOR_DEPOSIT_FROM_REFERRAL')}: {USER_REFERENCE_PERCENTAGE}%</h3>
          <h4>{translate('YOUR_REFERRAL_LINK')}</h4>
          <Input
            readOnly
            size="large"
            value={`${location.origin}/?invitedById=${id}&invitedByDisplayName=${displayName}&showModal=sign-up`}
          />
        <div className={styles.text}>{translate('PARTNER_PROGRAM_HOW_TO_START_TEXT_2')}</div>
          <h3>{translate('YOUR_REFERRALS')}</h3>
          <Spinner spinnerKey="REST_API.GET_WITHDRAWS_REQUEST" overlay={true} transparentOverlay={true}>
            {
              !isMobile ? (
                <Table
                  dataSource={referrals}
                  columns={getColumns({ USER_REFERENCE_PERCENTAGE })}
                  pagination={false}
                  rowKey={(o) => o.createdAt}
                  className={styles.table}
                />
              ) : (
                <List
                  className={styles.widthrawsList}
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
                  dataSource={referrals}
                  renderItem={({ totalInvested, displayName }) => (
                    <List.Item>
                      <Card title={displayName}>
                        <div className={styles.card}>
                          <div>
                            <span>$ {totalInvested}</span>
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
      </Container>
    </div>
  );
}

ForPartners.defaultProps = {
};

ForPartners.propTypes = {
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  businessConfig: PropTypes.object.isRequired,
};

export default compose(
  withLocalize,
  withRouter,
  withUser(),
  withBusinessConfig(),
  lifecycle({
    componentDidMount() {
      this.props.getReferrals()
    }
  }),
  withHandlers({
    calculated: ({ userInfo }) => ({ amount, tariffId, billingSystem, tariff }) => {
      window.location = `${process.env.REACT_APP_BILLING_DOMAIN}hp/${amount}/${billingSystem.label.toLowerCase().replace(/ /g, '-')}/?userId=${userInfo.id}&tariffId=${tariffId}&comment=Тариф "${tariff.name}"`;
    }
  }),
  pure,
)(ForPartners);
