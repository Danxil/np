import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import styles from './Tariffs.module.scss';
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';

const TARIFFS = [
  {
    title: 'BEGINNER',
    percentage: 1,
    duration: 7,
    minInvestition: 10,
  },
  {
    title: 'BASE',
    percentage: 2,
    duration: 14,
    minInvestition: 150,
  },
  {
    title: 'EXPERT',
    percentage: 3,
    duration: 28,
    minInvestition: 500,
  },
  {
    title: 'ADVANCED',
    percentage: 4,
    duration: 35,
    minInvestition: 1000,
  },
];

const Tariffs = ({
  translate,
}) => {
  return (
    <div className={styles.tariffs}>
      <PageTitle>{translate('TARIFS')}</PageTitle>
      <Container>
        <div className={styles.tariffsList}>
        {
          TARIFFS.map(({ title, percentage }) => (
            <div key={title} className={styles.tariff}>
              <h3 className={styles.tariffTitle}>{title}</h3>
              <div className={styles.percentage}>{percentage}% <span className={styles.period}>{translate('PER_DAY')}</span></div>
            </div>
          ))
        }
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(Tariffs);

Tariffs.propTypes = {
  translate: PropTypes.func.isRequired,
};
