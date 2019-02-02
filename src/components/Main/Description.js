import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'antd';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import HowTo from '../common/HowTo';
import PageTitle from '../common/PageTitle';
import Link from '../common/Link';
import styles from './Description.module.scss';


const HOW_TO = {
  investor: [
    {
      stepNumber: 1,
      iconClass: 'fas fa-credit-card',
      stepItemsKeys: [
        'HOW_TO_INVESTORS_STEP_1_ITEM_1',
      ]
    },
    {
      stepNumber: 2,
      iconClass: 'fas fa-suitcase',
      stepItemsKeys: [
          'HOW_TO_INVESTORS_STEP_2_ITEM_1',
      ]
    },
    {
      stepNumber: 3,
      iconClass: 'fas fa-chart-line',
      stepItemsKeys: [
          'HOW_TO_INVESTORS_STEP_3_ITEM_1',
      ]
    },
    {
      stepNumber: 4,
      iconClass: 'fas fa-hand-holding-usd',
      stepItemsKeys: [
          'HOW_TO_INVESTORS_STEP_4_ITEM_1',
      ]
    },
  ],
  borrower: [
    {
      stepNumber: 1,
      iconClass: 'fas fa-sliders-h',
      stepItemsKeys: [
        'HOW_TO_BORROWERS_STEP_1_ITEM_1',
      ]
    },
    {
      stepNumber: 2,
      iconClass: 'fas fa-user-check',
      stepItemsKeys: [
        'HOW_TO_BORROWERS_STEP_2_ITEM_1',
      ]
    },
    {
      stepNumber: 3,
      iconClass: 'fas fa-handshake',
      stepItemsKeys: [
        'HOW_TO_BORROWERS_STEP_3_ITEM_1',
      ]
    },
    {
      stepNumber: 4,
      iconClass: 'fas fa-dollar-sign',
      stepItemsKeys: [
        'HOW_TO_BORROWERS_STEP_4_ITEM_1',
      ]
    },
  ],
};

const Description = ({
  translate,
}) => {
  return (
    <div className={classNames(styles.description, 'descriptionBlock')}>
      <div className={styles.content}>
        <PageTitle className={styles.title}>{translate('HOW_IT_WORKS')}</PageTitle>
        <HowTo howTo={HOW_TO['investor']} />
        <Button
          type="primary"
          className={classNames('ghostBtn', styles.btn)}
          size="large"
        >
          <Link to={{ pathname: '/sign-up' }}>{translate('MAKE_INVESTMENT')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(Description);

Description.propTypes = {
  translate: PropTypes.func.isRequired,
};
