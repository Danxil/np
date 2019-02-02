import React from 'react';
import PropTypes from 'prop-types';
import Calculator from '../common/Calculator';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import styles from './index.module.css';

const Replenish = () => {
  return (
    <div className={styles.replenish}>
      Replenish
      <Calculator
        onDone={(args) => {
          console.log(args)
        }}
      />
    </div>
  );
}

Replenish.defaultProps = {
  userData: null,
};

Replenish.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  pure,
)(Replenish);
