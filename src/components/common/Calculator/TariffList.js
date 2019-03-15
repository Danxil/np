import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import { Icon } from 'antd';
import Tariff from '../Tariff';
import styles from './TariffList.module.scss';

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
            amountDescription={translate('DAILY_PROFIT')}
            selected={selectedId === tariff.id}
            onSelect={onSelect}
            tariffId={tariff.id}
            lines={[
              {
                label: translate('BORROWERS_RELIABILITY'),
                value: `${tariff.minReliability} % - ${tariff.maxReliability} %`,
                info: translate(`${tariff.name}_BORROWERS_INFO`)
              },
              {
                label: translate('LOAN_AMOUNT'),
                value: `${tariff.minCredit} $ - ${tariff.maxCredit} $`
              },
              {
                label: translate('LOAN_TIME'),
                value: `${tariff.minDuration} - ${tariff.maxDuration} ${translate('DAYS').toLowerCase()}`,
              },
              {
                label: translate('MINIMAL_INVESTMENT'),
                value: `${tariff.minReplenishment} $`
              },
              {
                label: translate('INSURANCE'),
                value: tariff.name === 'BEGINNER' || tariff.name === 'BASE' ? '-' : <Icon type="check" />,
                info: translate(`NON_RETURN_INSURANCE_INFO`)
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
