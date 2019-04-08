import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../../containers/withUser';
import styles from './index.module.scss';
import User from './User';

const Users = ({ users }) => {
  return (
    <div className={styles.users}>
      <div className={styles.list}>
        {
          users.map((user, index) => (
            <User key={`user-${index}`} {...user} />
          ))
        }
      </div>

    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  pure,
)(Users);

Users.defaultProps = {
  userInfo: null,
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
};
