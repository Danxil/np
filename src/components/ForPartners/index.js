import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Input } from 'antd';
import { withRouter } from 'react-router';
import { withLocalize } from 'react-localize-redux';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withUser from '../../containers/withUser';

const ForPartners = ({ translate, userInfo: { id, displayName } }) => {
  return (
    <div className={styles.forPartners}>
      <Container>
        <PageTitle>{translate('FOR_PARTNERS')}</PageTitle>
        <h3>{translate('YOUR_REFERAL_LINK')}</h3>
        <Input
          readOnly
          size="large"
          value={`${location.origin}/sign-up/?invitedById=${id}&invitedByNick=${displayName}`}
        />
      <div className={styles.text}>{translate('PARTNER_PROGRAM_HOW_TO_START')}</div>
      </Container>
    </div>
  );
}

ForPartners.defaultProps = {
};

ForPartners.propTypes = {
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default compose(
  withLocalize,
  withRouter,
  withUser(),
  withHandlers({
    calculated: ({ userInfo }) => ({ amount, tariffId, billingSystem, tariff }) => {
      window.location = `${process.env.REACT_APP_BILLING_DOMAIN}hp/${amount}/${billingSystem.label.toLowerCase().replace(/ /g, '-')}/?userId=${userInfo.id}&tariffId=${tariffId}&comment=Тариф "${tariff.name}"`;
    }
  }),
  pure,
)(ForPartners);
