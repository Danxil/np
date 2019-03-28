import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import Top from './Top';
import ForInvestors from './ForInvestors';
import ForBorrowers from './ForBorrowers';
import Login from './Login';
import AboutUs from './AboutUs';
import Partners from './Partners';
import Support from '../Support';
import styles from './index.module.scss';

const Main = ({ match: { params: { visitorType } } }) => {
  return (
    <div className={styles.main}>
      <Top />
      <div className={classNames(styles.item, 'item')}>
        {
          visitorType === 'borrower' && (
            <ForBorrowers />
          )
        }
        {
          visitorType === 'investor' && (
            <ForInvestors />
          )
        }
        <AboutUs/>
        <Support />
        <Partners />
      </div>
      <Login />
    </div>
  );
}

Main.propTypes = {
  match: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  pure,
)(Main);
