import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import { Button } from 'antd';
import withUser from '../../../containers/withUser';
import Container from '../../common/Container';
import styles from './User.module.scss';
import Replenishments from '../../common/Replenishments';
import Withdraws from '../../common/Withdraws';


const User = ({
  email,
  displayName,
  accountType,
  unverifyUser,
  replenishments,
  withdraws,
  id: userId,
}) => {
  console.log(111, withdraws);
  return (
    <div className={styles.user}>
      <Container>
        <div className={styles.content}>
          <p>
            Email: {email}
          </p>
          <p>
            Nickname: {displayName}
          </p>
          <p>
            Account type: {accountType}
          </p>
          <div className={styles.notVerified}>
            <div className={classNames(styles.verifyBtns)}>
              {
                accountType === 'borrower' && (
                  <Button
                    size="large"
                    type="primary"
                    className={styles.verifyBtn}
                    onClick={() => unverifyUser({ userId })}
                  >
                    Unverify
                  </Button>
                )
              }
            </div>
          </div>
          <p>
            Replenishments
          </p>
          <Replenishments replenishments={replenishments} />
          <p>
            Withdraws
          </p>
          <Withdraws withdraws={withdraws} />
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
  email: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired,
  unverifyUser: PropTypes.func.isRequired,
  replenishments: PropTypes.array.isRequired,
  withdraws: PropTypes.array.isRequired,
};
