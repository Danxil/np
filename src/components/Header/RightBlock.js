import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, branch, renderComponent, withHandlers, pure } from 'recompose';
import { Icon, Avatar } from 'antd';
import withUser from '../../containers/withUser';
import Coins from '../common/Coins';
import { toFixedIfNeed } from '../../helpers/gameUtils';
import { withLocalize } from 'react-localize-redux';
import styles from './RightBlock.css';

const RightBlock = ({ logout, userInfo, translate }) => {
  return (
    <div className={styles.rightBlock}>
      <span className={styles.balance}>
        <span className={styles.balanceLabel}>{translate('BALANCE')}:</span>
        <span className={styles.balanceAmount}>
          <Coins /> <span className={styles.coinsAmount}>{toFixedIfNeed(userInfo.balance)}</span> <Link to="/by-coins">
          <Icon type="plus-circle-o" />
          </Link>
        </span>
      </span>
      <div className={styles.userBlock}>
        <span className={styles.userName}>{userInfo.displayName || userInfo.email}</span>
        <Avatar size="small" className={`${styles.playerAvatar}`} icon="user" src={userInfo.photo} />
        <Icon type="logout" className={styles.logOut} onClick={logout} />
      </div>
    </div>
  )
}

RightBlock.defaultProps = {
  userData: null,
};

RightBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  logout: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};

export default compose(
  withLocalize,
  withUser(),
  branch(
    ({ userInfo }) => !userInfo,
    renderComponent(() => null)
  ),
  withHandlers({
    logout: ({ logout }) => () => {
      logout();
    }
  }),
  pure
)(RightBlock);
