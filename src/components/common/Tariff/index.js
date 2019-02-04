import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';

const Tariff = ({
  tariffTitle,
  amount,
  amountDescription,
  lines,
}) => {
  return (
    <div className={styles.tariff}>
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
};

Tariff.propTypes = {
  amount: PropTypes.string.isRequired,
  amountDescription: PropTypes.string,
  tariffTitle: PropTypes.string.isRequired,
  lines: PropTypes.array.isRequired,
};
