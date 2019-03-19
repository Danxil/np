import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import styles from './index.module.scss';


const TariffList = ({
  children,
}) => {
  return (
    <div className={styles.tariffsList}>
      {children}
    </div>
  );
};

export default compose(
  withRouter,
  pure,
)(TariffList);

TariffList.propTypes = {
  children: PropTypes.array.isRequired,
};
