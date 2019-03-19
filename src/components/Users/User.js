import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import { Button } from 'antd';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import styles from './User.module.scss';


const User = ({
  email,
  accountType,
  unverifyUser,
  id: userId,
}) => {
  return (
    <div className={styles.user}>
      <Container>
        <div className={styles.content}>
          <p>
            {email}
          </p>
          <p>
            {accountType}
          </p>
          <div className={styles.notVerified}>
            <div className={classNames(styles.verifyBtns)}>
              <Button
                size="large"
                type="primary"
                className={styles.verifyBtn}
                onClick={() => unverifyUser({ userId })}
              >
                Unverify
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  pure,
)(User);

User.defaultProps = {
  userInfo: null,
};
User.propTypes = {
  form: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired,
  unverifyUser: PropTypes.func.isRequired,
};
