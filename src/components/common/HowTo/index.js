import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { pure, compose} from 'recompose';
import styles from './index.module.scss';

const HowTo = ({ translate, howTo, uniqKey }) => {
  return (
    howTo.map((step, stepIndex) => Object.keys(step).length ? (
      <div
        key={`${uniqKey}step${stepIndex}`}
        className={classNames(styles.howToPlayStep, {
          [styles.stepOdd]: stepIndex % 2 === 0,
          [styles.stepEven]: stepIndex % 2 !== 0,
        })}
      >
        <div className={classNames(styles.howToPlayImage)}>
          <i className={classNames(styles.icon, step.iconClass)} />
        </div>
        <div className={styles.howToPlayText}>
          <div className={styles.stepNumber}>{translate('STEP')} {step.stepNumber}</div>
          {
            step.stepItemsKeys.map(text => (
              <div key={`${uniqKey}${text}`}>{translate(text)}</div>
            ))
          }
        </div>
      </div>
    ) : <div/>)
  );
};

export default compose(
  withLocalize,
  pure,
)(HowTo);

HowTo.defaultProps = {
  uniqKey: '',
};

HowTo.propTypes = {
  uniqKey: PropTypes.string,
  howTo: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
};
