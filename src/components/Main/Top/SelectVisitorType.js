import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import { Button } from 'antd';
import styles from './SelectVisitorType.module.scss';
import PageTitle from '../../common/PageTitle';
import Link from '../../common/Link';

const BUTTONS = [
  {
    id: 'borrower',
    labelTranslateId: 'TAKE_A_LOAN',
    to: { pathname: '/borrower', search: '?' },
  },
  {
    id: 'investor',
    labelTranslateId: 'GIVE_A_LOAN',
    to: { pathname: '/investor', search: '?' },
  }
]

const SelectVisitorType = ({
  translate,
  match: {
    params: { visitorType },
  },
}) => {
  return (
    <div>
      <PageTitle className={styles.title}>{translate('WHAT_ARE_YOU_INTERESTED_IN')}?</PageTitle>
      <div className={styles.buttonsWrapper}>
        {
          BUTTONS.map(btn => (
            <div
              key={`btn${btn.labelTranslateId}`}
              className={classNames('ghostBtn', styles.btnBlock, { [styles.activeBtnBlock]: visitorType === btn.id })}
            >
              <Link to={btn.to}>
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
                  {translate(btn.labelTranslateId)}
                </Button>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default compose(
  withLocalize,
  withRouter,
  pure,
)(SelectVisitorType);

SelectVisitorType.propTypes = {
  translate: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
