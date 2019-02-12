import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';

const Tariff = ({
  tariffTitle,
  completed,
  amount,
  amountDescription,
  lines,
}) => {
  console.log(classNames);
  return (
    <div className={classNames(styles.tariff, { completed } )}>
      <h3 className={styles.tariffTitle}>{tariffTitle}</h3>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.amountDescription}>{amountDescription}</div>
      {
        lines.map((line) => (
          <div key={line.label} className={styles.descriptionLine}>{line.label}: {line.value}</div>
        ))
      }
    </div>
  );
};

export default compose(
  pure,
)(Tariff);

Tariff.defaultProps = {
  amountDescription: null,
  completed: false,
};

Tariff.propTypes = {
  amount: PropTypes.string.isRequired,
  amountDescription: PropTypes.string,
  tariffTitle: PropTypes.string.isRequired,
  lines: PropTypes.array.isRequired,
  completed: PropTypes.bool,
};
