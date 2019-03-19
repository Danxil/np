import React from 'react';
import PropTypes from 'prop-types';
import { BorrowersCalculator } from '../common/Calculator';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, withHandlers, branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withInvestments from '../../containers/withInvestments';
import withUser from '../../containers/withUser';

const TakeLoan = ({ calculated }) => {
  return (
    <div className={styles.replenish}>
      <Container>
        <BorrowersCalculator
          onDone={calculated}
        />
      </Container>
    </div>
  );
}

TakeLoan.defaultProps = {
};

TakeLoan.propTypes = {
  investments: PropTypes.array.isRequired,
  createInvestment: PropTypes.func.isRequired,
  calculated: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withLocalize,
  withInvestments(),
  withUser(),
  branch(
    ({ userInfo }) => userInfo.verified === null,
    renderComponent(({ translate }) => (
      <div>
        <Container>
          <div className={styles.verificationMessage}>
            <PageTitle>{translate('PLEASE_WAIT_FOR_VERIFICATION')}</PageTitle>
          </div>
        </Container>
      </div>
    )),
  ),
  branch(
    ({ userInfo }) => userInfo.verified === false,
    renderComponent(({ translate }) => (
      <div>
        <Container>
          <div className={styles.verificationMessage}>
            <PageTitle>{translate('VERIFICATION_NOT_PASSED')}</PageTitle>
          </div>
        </Container>
      </div>
    )),
  ),
  withHandlers({
    calculated: () => () => {}
  }),
  pure,
)(TakeLoan);
