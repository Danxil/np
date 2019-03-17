import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withLocalize } from 'react-localize-redux';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';
import PageTitle from '../../common/PageTitle';
import Container from '../../common/Container';

const ACHIEVEMENTS = [
  {
    value: moment().diff(moment('2018-06-01'), 'days') * 122,
    textKey: 'OUR_ACHIEVEMENTS_1_DESCRIPTION',
    unitKey: '$',
    iconClass: 'fas fa-hand-holding-usd',
  },
  {
    value: moment().diff(moment('2018-06-01'), 'days') * 153,
    textKey: 'OUR_ACHIEVEMENTS_2_DESCRIPTION',
    unitKey: '$',
    iconClass: 'fas fas fa-money-bill',
  },
  {
    value: moment().diff(moment('2018-06-01'), 'days') * 6,
    textKey: 'OUR_ACHIEVEMENTS_3_DESCRIPTION',
    unitKey: null,
    iconClass: 'fas fas fa-users',
  },
];

const Achievements = ({
  translate,
}) => {
  return (
    <div className={styles.bg}>

      <div className={styles.bgInside}>
        <div className={styles.bgOverlay}></div>
        <div className={styles.bgShadow}></div>
        <div className={styles.achievementsBlock}>
          <PageTitle>{translate('OUR_ACHIEVEMENTS')}</PageTitle>
          <Container>
            <div className={styles.achievementsList}>
              {
                ACHIEVEMENTS.map(o => (
                  <div key={o.textKey} className={styles.achievementsItem}>
                    <i className={classNames(o.iconClass, styles.achievementIcon)}></i>
                    <div className={styles.achievementText}>
                      {o.value} <span className={styles.achievementUnit}>{o.unitKey !== null ? translate(o.unitKey) : null}</span>
                    </div>
                    <div className={styles.achievementDescription}>{translate(o.textKey)}</div>
                  </div>
                ))
              }
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
};

export default compose(
  withLocalize,
  pure,
)(Achievements);

Achievements.propTypes = {
  translate: PropTypes.func.isRequired,
};
