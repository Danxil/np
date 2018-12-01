import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { pure, compose} from 'recompose';
import styles from './index.module.scss';


const HowTo = ({ translate, howTo, uniqKey }) => {
  return (
    howTo.map((step, stepIndex) => (
      <div
        key={`${uniqKey}step${stepIndex}`}
        className={classNames(
          styles.howToPlayStep,
          {
            [styles.stepOdd]: stepIndex % 2 === 0,
            [styles.stepEven]: stepIndex % 2 !== 0,
          }
        )}
      >
        <div className={classNames(styles.howToPlayImage, 'howToPlayImage')}>
          <img src={step.imageUrl} />
        </div>
        <div className={styles.howToPlayText}>
          <div className={styles.stepNumber}>{translate('STEP')} {stepIndex + 1}</div>
          {
            step.stepItemsKeys.map(text => (
              <div key={`${uniqKey}${text}`}>- {translate(text)}</div>
            ))
          }
        </div>
      </div>
    ))
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
  styles: PropTypes.object.isRequired,
  howTo: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
};
