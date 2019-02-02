import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'antd';
import classNames from 'classnames';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import { compose, pure } from 'recompose';
import Language from '../common/Language';
import styles from './Top.module.scss';
import Link from '../common/Link';

export const MENU_ITEMS = [
  {
    translateId: 'SIGN_UP',
    route: '/sign-up',
    iconType: 'smile-o',
  },
  {
    translateId: 'HOW_IT_WORKS',
    scrollToSelector: '.descriptionBlock',
    iconType: 'smile-o',
  },
  {
    translateId: 'TARIFFS',
    scrollToSelector: '.tariffsBlock',
    iconType: 'smile-o',
  },
  {
    translateId: 'PARTNER_PROGRAM',
    route: null,
    scrollToSelector: '.partnersBlock',
    iconType: 'smile-o',
  }
]

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
                  <Link to={{ pathname: '/' }}>FastCredit</Link>
                </div>
                <div className={styles.rightBlock}>
                  <menu className={styles.menu}>
                    {
                      MENU_ITEMS.map(({ translateId, route, scrollToSelector }) => (
                        <li key={translateId} className={styles.menuItem}>
                          {
                            route ? (
                              <Link to={{ pathname: route }} className={styles.menuLink}>{translate(translateId)}</Link>
                            ) : (
                              <a
                                onClick={() => {
                                  window.scrollTo({
                                   top: document.querySelector(scrollToSelector).offsetTop,
                                   behavior: "smooth",
                                  })
                                }}
                                className={styles.menuLink}
                              >
                                {translate(translateId)}
                              </a>
                            )
                          }
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
                <Button
                  type="primary"
                  className={classNames('ghostBtn', styles.btn)}
                  size="large"
                >
                  <Link to={{ pathname: '/sign-up' }}>{translate('MAKE_INVESTMENT')}</Link>
                </Button>
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
  withUser(),
  pure,
)(Top);

Top.defaultProps = {
  userInfo: null,
};
Top.propTypes = {
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};
