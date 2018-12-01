import PropTypes from 'prop-types';
import React from 'react';
import { pure, compose } from 'recompose';
import styles from './index.module.scss';

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>
};

export default compose(pure)(Container);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
