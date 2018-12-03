import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withLocalize } from 'react-localize-redux';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import styles from './Achievements.module.scss';

const ACHIEVEMENTS = [
  {
    value: moment().diff(moment('2018-06-01'), 'days') * 325,
    textKey: 'OUR_ACHIEVEMENTS_1_DESCRIPTION',
    unitKey: '$',
    iconClass: 'fas fa-hand-holding-usd',
  },
  {
    value: 125,
    textKey: 'OUR_ACHIEVEMENTS_2_DESCRIPTION',
    unitKey: 'OUR_ACHIEVEMENTS_2_TEXT',
    iconClass: 'fas fas fa-money-bill',
  },
  {
    value: 837,
    textKey: 'OUR_ACHIEVEMENTS_3_DESCRIPTION',
    unitKey: 'OUR_ACHIEVEMENTS_3_TEXT',
    iconClass: 'fas fas fa-users',
  },
];

const Achievements = ({
  translate,
}) => {
  return (
    <div className={styles.achievementsBlock}>
      <div className={styles.achievementsList}>
        {
          ACHIEVEMENTS.map(o => (
            <div key={o.textKey} className={styles.achievementsItem}>
              <i className={classNames(o.iconClass, styles.achievementIcon)}></i>
              <div className={styles.achievementText}>
                {o.value} <span className={styles.achievementUnit}>{translate(o.unitKey)}</span>
              </div>
              <div className={styles.achievementDescription}>{translate(o.textKey)}!</div>
            </div>
          ))
        }
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
