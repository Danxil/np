import React from 'react';
import classNames from 'classnames';
import { Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import styles from './index.module.scss';

const Tariff = ({
  tariffTitle,
  completed,
  amount,
  amountDescription,
  lines,
  selected,
  onCLick,
  onSelect,
}) => {
  return (
    <div
      className={classNames(
        styles.tariff,
        {
          selectable: !!onSelect,
          tariffSelected: selected,
          completed
        },
      )}
      onClick={onCLick}
    >
      <h3 className={styles.tariffTitle}>{tariffTitle}</h3>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.amountDescription}>{amountDescription}</div>
      {
        lines.map((line) => (
          <div key={line.label} className={styles.descriptionLine}>
            <div className={styles.descriptionValue}>{line.value}</div>
            <div className={styles.descriptionLabel}>
              {line.label}
              {
                line.info && (
                  <Tooltip title={line.info}>
                    <Icon type="question-circle" className={styles.info} />
                  </Tooltip>
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default compose(
  withHandlers({
    onCLick: ({ tariffId, onSelect }) => () => {
      onSelect && onSelect(tariffId);
    }
  }),
  pure,
)(Tariff);

Tariff.defaultProps = {
  amountDescription: null,
  completed: false,
  selected: false,
  onSelect: null,
};

Tariff.propTypes = {
  tariffId: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  amountDescription: PropTypes.string,
  tariffTitle: PropTypes.string.isRequired,
  lines: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  onCLick: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  selected: PropTypes.bool,
};
