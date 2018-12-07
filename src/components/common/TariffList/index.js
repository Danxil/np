import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import styles from './index.module.scss';

const Tariffs = ({
  tariffs,
  renderDescription
}) => {
  return (
    <div className={styles.tariffsList}>
      {
        tariffs.map((tariff, index) => (
          <div key={tariff.title} className={classNames(styles.tariff, {[styles.tariffSelected]: index === 1 })}>
            <h3 className={styles.tariffTitle}>{tariff.title}</h3>
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
  tariffs: PropTypes.array.isRequired,
  renderDescription: PropTypes.func.isRequired,
};
