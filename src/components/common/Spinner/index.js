import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import {
  compose,
  withProps,
  pure,
} from 'recompose';
import Spinkit from 'react-spinkit';
import withSpinners from '../../../containers/withSpinners';
import styles from './index.module.css';

const SpinkitComp = ({ noFadeIn }) => <Spinkit name="ball-scale-ripple-multiple" noFadeIn={noFadeIn} />;

SpinkitComp.propTypes = {
  noFadeIn: PropTypes.bool.isRequired,
};

const Spinner = ({ overlay, noFadeIn, children, showSpinner, fixed, transparentOverlay }) => {
  return (<Fragment>
    {
      showSpinner && <Fragment>
        {
          overlay ?
            (<div className={classNames(styles.overlay, { fixed, transparentOverlay })}>
              <SpinkitComp noFadeIn={noFadeIn} />
            </div>) :
            <div className={styles.spinnerWrapper}><SpinkitComp noFadeIn={noFadeIn}/></div>
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
  overlay: false,
  spinnerKey: null,
  children: null,
  show: null,
  noFadeIn: false,
  showSpinner: false,
  fixed: false,
  transparentOverlay: false,
};

Spinner.propTypes = {
  overlay: PropTypes.bool,
  showSpinner: PropTypes.bool,
  noFadeIn: PropTypes.bool,
  spinners: PropTypes.object.isRequired,
  spinnerKey: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  fixed: PropTypes.bool,
  transparentOverlay: PropTypes.bool,
};
