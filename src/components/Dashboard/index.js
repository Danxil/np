import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import styles from './index.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      Dashboard
      <div>
        <div>200</div>
      </div>
    </div>
  );
}

Dashboard.defaultProps = {
  userData: null,
};

Dashboard.propTypes = {
};

export default compose(
  pure,
)(Dashboard);
