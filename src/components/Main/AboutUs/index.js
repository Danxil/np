import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';
import PageTitle from '../../common/PageTitle';
import Container from '../../common/Container';

const Achievements = ({
  translate,
}) => {
  return (
    <div className={styles.bg}>

      <div className={styles.bgInside}>
        <div className={styles.bgOverlay}></div>
        <div className={styles.bgShadow}></div>
        <div className={styles.aboutUs}>
          <PageTitle>{translate('ABOUT_US')}</PageTitle>
          <Container>
            {translate('SLOGAN_DESCRIPTION')}
          </Container>
        </div>
      </div>
    </div>
  )
};

export default compose(
  withLocalize,
  pure,
)(Achievements);

Achievements.propTypes = {
  translate: PropTypes.func.isRequired,
};
