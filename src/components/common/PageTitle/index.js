import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import styles from './PageTitle.module.scss';

const PageTitle = ({
  children,
  className,
}) => (
  <h1 className={`${styles.pageTitle} ${className}`}>{children}</h1>
);

export default compose(
  pure,
)(PageTitle);

PageTitle.defaultProps = {
  className: '',
};
PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
