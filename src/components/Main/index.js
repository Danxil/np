import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import Top from './Top';
import Description from './Description';
import Achievements from './Achievements';
import InvestmentPlans from './InvestmentPlans';
import Partners from './Partners';
import Login from './Login';
import styles from './index.module.scss';

const Main = ({ match: { params: { visitorType } } }) => {
  return (
    <div className={styles.main}>
      <Top />
      <div className={classNames(styles.item, 'item', { [styles.visible]: visitorType === 'investor' })}>
        <Description />
        <Achievements />
        <InvestmentPlans />
        <Partners />
      </div>
      <div className={classNames(styles.item, 'item', { [styles.visible]: visitorType === 'borrower' })}>
      </div>
      <Login />
    </div>
  );
}

Main.propTypes = {
  match: PropTypes.object.isRequired,
};

export default compose(
  pure,
)(Main);
