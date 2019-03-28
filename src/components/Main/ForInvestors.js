import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Description from './Description';
import Achievements from './Achievements';
import { InvestorsCalculator } from '../common/Calculator';


const HOW_TO = [
  {
    stepNumber: 1,
    iconClass: 'fas fa-credit-card',
    stepItemsKeys: [
      'HOW_TO_INVESTORS_STEP_1_ITEM_1',
    ]
  },
  {
    stepNumber: 2,
    iconClass: 'fas fa-clipboard-list',
    stepItemsKeys: [
        'HOW_TO_INVESTORS_STEP_2_ITEM_1',
    ]
  },
  {
    stepNumber: 3,
    iconClass: 'fas fa-percent',
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
];


const ForInvestors = ({ translate }) => {
  return (
    <Fragment>
      <Description
        howTo={HOW_TO}
        title={translate('HOW_TO_GIVE_A_LOAN')}
        btnLabel={translate('MAKE_INVESTMENT')}
        btnOnClick={() => {
          window.scrollTo({
           top: document.querySelector('.investmentPlans').offsetTop,
           behavior: "smooth",
          })
        }}
      />
      <Achievements />
      <InvestorsCalculator />
    </Fragment>
  );
}

ForInvestors.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default compose(
  withLocalize,
  pure,
)(ForInvestors);
