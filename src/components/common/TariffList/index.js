import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import styles from './index.module.scss';

const Tariffs = ({
  tariffs,
  renderDescription,
  selectedId,
  onSelect,
}) => {
  return (
    <div className={styles.tariffsList}>
      {
        tariffs.map((tariff) => (
          <div
            key={tariff.name}
            className={classNames(styles.tariff, {[styles.tariffSelected]: selectedId === tariff.id })}
            onClick={() => onSelect(tariff)}
          >
            <h3 className={styles.tariffTitle}>{tariff.name}</h3>
            {renderDescription(tariff)}
          </div>
        ))
      }
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(Tariffs);

Tariffs.propTypes = {
  translate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  tariffs: PropTypes.array.isRequired,
  renderDescription: PropTypes.func.isRequired,
  selectedId: PropTypes.number.isRequired,
};
