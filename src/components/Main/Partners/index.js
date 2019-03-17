import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import PageTitle from '../../common/PageTitle';
import Link from '../../common/Link';
import Container from '../../common/Container';
import { getReasignedSearchQuery } from '../../../helpers/utils';
import styles from './index.module.scss';

const Description = ({
  translate,
}) => {
  return (
    <div className={classNames(styles.partners, 'partnersBlock')}>
      <PageTitle>{translate('PARTNER_PROGRAM')}</PageTitle>
      <Container>
        <div className={styles.text}>
          {translate('PARTNER_PROGRAM_TEXT')}
        </div>
        <div className={styles.icons}>
          <i className={classNames(styles.icon, 'fa fa-user-plus')} />
          <i className={classNames(styles.icon, 'fa fa-users')} />
          <i className={classNames(styles.icon, 'fa fa-money-bill')} />
        </div>
        <div className={styles.bonus}>{translate('BONUS_FOR_DEPOSIT_FROM_REFERRAL')}: 5%</div>
        <div className={styles.howToStart}>
          {translate('PARTNER_PROGRAM_HOW_TO_START')}
        </div>
        <Button
          type="primary"
          className={classNames(styles.btn)}
          size="large"
        >
          <Link to={{ search: getReasignedSearchQuery({ showModal: 'sign-up'}) }}>{translate('SIGN_UP')}</Link>
        </Button>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(Description);

Description.propTypes = {
  translate: PropTypes.func.isRequired,
};
