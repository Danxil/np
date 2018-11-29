import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  compose,
  withProps,
  pure,
} from 'recompose';
import Spinkit from 'react-spinkit';
import { blueColor } from '../../../variables';
import withSpinners from '../../../containers/withSpinners';
import styles from './index.css';

const SpinkitComp = ({ color, noFadeIn }) => <Spinkit name="ball-scale-ripple-multiple" color={color} noFadeIn={noFadeIn} />;

SpinkitComp.propTypes = {
  color: PropTypes.string.isRequired,
  noFadeIn: PropTypes.bool.isRequired,
};

const Spinner = ({ color, overlay, noFadeIn, children, showSpinner }) => {
  return (<Fragment>
    {
      showSpinner && <Fragment>
        {
          overlay ?
            (<div className={styles.overlay}>
              <SpinkitComp noFadeIn={noFadeIn} color={color}/>
            </div>) :
            <div className={styles.spinnerWrapper}><SpinkitComp color={color} noFadeIn={noFadeIn}/></div>
        }
      </Fragment>
    }
    <div style={{ visibility: showSpinner ? 'hidden' : 'visible' }}>{children}</div>
  </Fragment>)
};


export default compose(
  withSpinners(),
  withProps(
    ({ spinners, spinnerKey, show }) => {
      let showSpinner;
      if (show !== null && show !== undefined) return { showSpinner: show };

      if (!spinnerKey) return { showSpinner: true };

      const keyVal = _.get(spinners, spinnerKey);

      if (!_.isObject(keyVal)) return { showSpinner: keyVal };

      showSpinner = !!Object.values(keyVal).find((o) => o === true);

      return { showSpinner };
    },
  ),
  pure,
)(Spinner);

Spinner.defaultProps = {
  overlayColor: null,
  color: blueColor,
  overlay: false,
  spinnerKey: null,
  children: null,
  show: null,
  noFadeIn: false,
  showSpinner: false,
  fixed: false,
};

Spinner.propTypes = {
  overlayColor: PropTypes.string,
  color: PropTypes.string,
  overlay: PropTypes.bool,
  showSpinner: PropTypes.bool,
  noFadeIn: PropTypes.bool,
  spinners: PropTypes.object.isRequired,
  spinnerKey: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  fixed: PropTypes.bool,
};
