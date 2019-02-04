import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import Tariff from '../common/Tariff';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';

const MyIvestments = ({ translate }) => {
  return (
    <div className={styles.myInvestments}>
      <Container>
        <PageTitle>{translate('MY_INVESTMENTS')}</PageTitle>
        <div className={styles.investments}>
          <Tariff
            tariffTitle="Base"
            amount="200 $"
            lines={[
              {
                label: translate('INVESTITION_DURATION'),
                value: '7'
              }
            ]}
          />
          <Tariff
            tariffTitle="Base"
            amount="200 $"
            lines={[
              {
                label: translate('INVESTITION_DURATION'),
                value: '7'
              }
            ]}
          />
        </div>
      </Container>
    </div>
  );
}

MyIvestments.defaultProps = {
  userData: null,
};

MyIvestments.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default compose(
  withLocalize,
  pure,
)(MyIvestments);
