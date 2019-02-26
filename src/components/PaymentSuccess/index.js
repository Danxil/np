import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import Container from '../common/Container';
import Link from '../common/Link';

const PaymentSuccess = ({ translate }) => {
  return (
    <div className={styles.paymentSuccess}>
      <Container>
        <div className={styles.window}>
          <h2 className={styles.title}>{translate('PAYMENT_SUCCESS')}</h2>
          <div>{translate('PAYMENT_SUCCESS_TEXT')}</div>
          <Link to={{ pathname: '/cabinet/' }}>
            <Button
              type="primary"
              size="large"
              className={classNames('ghostBtn', styles.btn)}
            >
              {translate('TO_THE_CABINET')}
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

PaymentSuccess.defaultProps = {
};

PaymentSuccess.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withLocalize,
  pure,
)(PaymentSuccess);
