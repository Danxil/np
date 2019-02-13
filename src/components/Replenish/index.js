import React from 'react';
import PropTypes from 'prop-types';
import Calculator from '../common/Calculator';
import { compose, pure, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import Container from '../common/Container';
import withInvestments from '../../containers/withInvestments';

const Replenish = ({ calculated }) => {
  return (
    <div className={styles.replenish}>
      <Container>
        <Calculator
          onDone={calculated}
        />
      </Container>
    </div>
  );
}

Replenish.defaultProps = {
};

Replenish.propTypes = {
  investments: PropTypes.array.isRequired,
  createInvestment: PropTypes.func.isRequired,
  calculated: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withInvestments(),
  withHandlers({
    calculated: ({ createInvestment }) => (args) => {
      console.log(11, args);
      createInvestment(args);
    }
  }),
  pure,
)(Replenish);
