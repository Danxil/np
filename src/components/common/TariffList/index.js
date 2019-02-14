import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import Tariff from '../Tariff';
import styles from './index.module.scss';

const TariffsList = ({
  tariffs,
  selectedId,
  onSelect,
  translate,
}) => {
  return (
    <div className={styles.tariffsList}>
      {
        tariffs.map((tariff) => (
          <Tariff
            key={`tariff-${tariff.name}`}
            tariffTitle={tariff.name}
            amount={`${tariff.percentage} %`}
            amountDescription={translate('DAILY_PAYMENTS')}
            selected={selectedId === tariff.id}
            onSelect={onSelect}
            tariffId={tariff.id}
            lines={[
              {
                label: translate('INVESTITION_DURATION'),
                value: `${tariff.duration} ${translate('DAYS')}`,
              },
              {
                label: translate('MINIMAL_INVESTITION'),
                value: `${tariff.minInvestment} $`
              },
              {
                label: translate('TOTAL_NET_PROFIT'),
                value: `${tariff.duration * tariff.percentage} $`,
              },
            ]}
          />
        ))
      }
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(TariffsList);

TariffsList.propTypes = {
  translate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  tariffs: PropTypes.array.isRequired,
  selectedId: PropTypes.number.isRequired,
};
