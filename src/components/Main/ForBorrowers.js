import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Description from './Description';
import Achievements from './Achievements';
import Partners from './Partners';
import AboutUs from './AboutUs';
import { BorrowersCalculator } from '../common/Calculator';

const HOW_TO = [
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
    iconClass: 'fas fa-dollar-sign',
    stepItemsKeys: [
      'HOW_TO_BORROWERS_STEP_3_ITEM_1',
    ]
  },
  {
    stepNumber: 4,
    iconClass: 'fas fa-handshake',
    stepItemsKeys: [
      'HOW_TO_BORROWERS_STEP_4_ITEM_1',
    ]
  },
];


const ForInvestors = ({ translate }) => {
  return (
    <Fragment>
      <Description
        howTo={HOW_TO}
        title={translate('HOW_TO_TAKE_A_LOAN')}
        btnLabel={translate('TAKE_A_LOAN')}
        btnOnClick={() => {
          window.scrollTo({
           top: document.querySelector('.investmentPlans').offsetTop,
           behavior: "smooth",
          })
        }}
      />
      <Achievements />
      <BorrowersCalculator />
      <AboutUs />
      <Partners />
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
