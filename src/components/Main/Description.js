import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'antd';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import HowTo from '../common/HowTo';
import PageTitle from '../common/PageTitle';
import styles from './Description.module.scss';

const DESCRIPTIONS = [
  {
    labelTranslateId: 'INVESTORS',
    howToKey: 'investors',
  },
  {
    labelTranslateId: 'BORROWERS',
    howToKey: 'borrowers',
  }
];
const HOW_TO = {
  investors: [
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
  borrowers: [
    {},
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
const DESCRIPTION_BUTTONS = {
  investors: {
    labelTranslateId: 'MAKE_INVESTMENT',
  },
  borrowers: {
    labelTranslateId: 'GET_A_LOAN',
  },
};

const Description = ({
  translate,
}) => {
  return (
    <div className={styles.descriptionsWrapper}>
      <PageTitle>{translate('HOW_IT_WORKS')}</PageTitle>
      <div className={styles.descriptions}>
        {
          DESCRIPTIONS.map(({ labelTranslateId, howToKey }) => (
            <div className={styles.description} key={labelTranslateId}>
              <div className={styles.content}>
                <h2 className={styles.descriptionTitle}>{translate(labelTranslateId)}</h2>
                <HowTo howTo={HOW_TO[howToKey]} uniqKey={howToKey} />
              </div>
              <Button
                key={`descriptionBtn ${howToKey}`}
                type="primary"
                className={classNames('ghostBtn', styles.btn)}
                size="large"
              >
                {translate(DESCRIPTION_BUTTONS[howToKey].labelTranslateId)}
              </Button>
            </div>
          ))
        }
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
