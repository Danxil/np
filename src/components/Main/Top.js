import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'antd';
import classNames from 'classnames';
import Container from '../common/Container';
import { compose, pure } from 'recompose';
import Language from '../common/Language';
import styles from './Top.module.scss';

export const MENU_ITEMS = [
  {
    translateId: 'MAKE_INVESTMENT',
    route: '/',
    iconType: 'smile-o',
  },
  {
    translateId: 'GET_A_LOAN',
    route: '/',
    iconType: 'smile-o',
  },
  {
    translateId: 'ABOUT_THE_PROJECT',
    route: '/',
    iconType: 'smile-o',
  },
  {
    translateId: 'CONTACTS',
    route: '/',
    iconType: 'smile-o',
  },
]

const BUTTONS = [
  {
    translateId: 'MAKE_INVESTMENT',
  },
  {
    translateId: 'GET_A_LOAN',
  }
];

const Top = ({
  translate,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.bg}>
        <div className={styles.bgInside}>
          <div className={styles.bgOverlay}></div>
          <div className={styles.bgShadow}></div>
          <div className={styles.content}>
            <Container>
              <div className={styles.header}>
                <div className={styles.logo}>
                  <a>FastCredit</a>
                </div>
                <div className={styles.rightBlock}>
                  <menu className={styles.menu}>
                    {
                      MENU_ITEMS.map(({ translateId }) => (
                        <li key={translateId} className={styles.menuItem}>
                          <a className={styles.menuLink}>{translate(translateId)}</a>
                        </li>
                      ))
                    }
                  </menu>
                  <Language />
                </div>
              </div>
              <div className={styles.sloganBlock}>
                <h1 className={styles.slogan}>{translate('SLOGAN_TITE')}</h1>
                <div className={styles.sloganDescription}>{translate('SLOGAN_DESCRIPTION')}</div>
              </div>
              <div className={styles.btnBlock}>
                {
                  BUTTONS.map(({ translateId }) => (
                    <Button
                      key={translateId}
                      type="primary"
                      className={classNames('ghostBtn', styles.btn)}
                      size="large"
                    >
                      {translate(translateId)}
                    </Button>
                  ))
                }
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withLocalize,
  pure,
)(Top);

Top.propTypes = {
  translate: PropTypes.func.isRequired,
};
