import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import { Button } from 'antd';
import styles from './SelectVisitorType.module.scss';
import PageTitle from '../common/PageTitle';
import Link from '../common/Link';

const BUTTONS = [
  {
    labelTranslateId: 'TAKE_A_LOAN',
    to: { pathname: '/borrower' },
  },
  {
    labelTranslateId: 'INVEST',
    to: { pathname: '/investor' },
  }
]

const SelectVisitorType = ({
  translate,
}) => {
  return (
    <div>
      <PageTitle className={styles.title}>{translate('WHAT_ARE_YOU_INTERESTED_IN')}?</PageTitle>
      <div className={styles.buttonsWrapper}>
        {
          BUTTONS.map(btn => (
            <div key={`btn${btn.labelTranslateId}`} className={styles.btnBlock}>
              <Button
                type="primary"
                className={classNames('ghostBtn', styles.btn)}
                size="large"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({
                     top: document.querySelector('.item').offsetTop,
                     behavior: "smooth",
                    })
                  })
                }}
              >
                <Link to={btn.to}>{translate(btn.labelTranslateId)}</Link>
              </Button>
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
)(SelectVisitorType);

SelectVisitorType.propTypes = {
  translate: PropTypes.func.isRequired,
};
