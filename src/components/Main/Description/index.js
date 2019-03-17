import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import HowTo from '../../common/HowTo';
import PageTitle from '../../common/PageTitle';
import styles from './index.module.scss';

const Description = ({
  howTo,
  title,
  btnLabel,
}) => {
  return (
    <div className={classNames(styles.description, 'descriptionBlock')}>
      <div className={styles.content}>
        <PageTitle className={styles.title}>{title}</PageTitle>
        <HowTo howTo={howTo} />
        <Button
          type="primary"
          className={classNames(styles.btn)}
          size="large"
          onClick={() => {
            window.scrollTo({
             top: document.querySelector('.investmentPlans').offsetTop,
             behavior: "smooth",
            })
          }}
        >
          {btnLabel}
        </Button>
      </div>
    </div>
  );
};

export default compose(
  pure,
)(Description);

Description.propTypes = {
  howTo: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
};
