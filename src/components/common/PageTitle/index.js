import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import styles from './PageTitle.module.scss';

const Title = ({
  children,
}) => (
  <h1 className={styles.pageTitle}>{children}</h1>
);

export default compose(
  pure,
)(Title);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};
