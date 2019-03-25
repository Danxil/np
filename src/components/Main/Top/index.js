import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router';
import { compose, pure, withState } from 'recompose';
import classNames from 'classnames';
import { Drawer } from 'antd';
import { getReasignedSearchQuery } from '../../../helpers/utils';
import withUser from '../../../containers/withUser';
import Container from '../../common/Container';
import Language from '../../common/Language';
import Link from '../../common/Link';
import SelectVisitorType from './SelectVisitorType';

import styles from './index.module.scss';

const Top = ({
  translate,
  showSideMenu,
  setShowSideMenu,
}) => {
  const MENU_ITEMS = [
    {
      translateId: 'SIGN_UP',
      route: { search: getReasignedSearchQuery({ showModal: 'sign-up' }) },
      iconType: 'smile-o',
    },
    {
      translateId: 'SIGN_IN',
      route: { search: getReasignedSearchQuery({ showModal: 'sign-in' }) },
      iconType: 'smile-o',
    },
    {
      translateId: 'HOW_TO_GIVE_A_LOAN',
      scrollToSelector: '.descriptionBlock',
      route: { pathname: '/investor' },
      iconType: 'smile-o',
    },
    {
      translateId: 'HOW_TO_TAKE_A_LOAN',
      scrollToSelector: '.descriptionBlock',
      route: { pathname: '/borrower' },
      iconType: 'smile-o',
    },
    {
      translateId: 'PARTNER_PROGRAM',
      scrollToSelector: '.partnersBlock',
      iconType: 'smile-o',
    }
  ];
  return (
    <div className={styles.main}>
      <div className={styles.bg}>
        <div className={styles.bgInside}></div>
        <div className={styles.bgOverlay}></div>
        <div className={styles.bgShadow}></div>
        <div className={styles.content}>
          <Container>
            <div className={styles.header}>
              <div className={styles.logo}>
                <Link to={{ pathname: '/' }}>FastCredit</Link>
              </div>
              <div className={styles.rightBlock}>
                <div className={styles.menu}>
                  {
                    MENU_ITEMS.map(({ translateId, route, scrollToSelector }) => {
                      return (
                      <div
                        key={translateId}
                        className={styles.menuItem}
                      >
                        {
                          route ? (
                            <Link
                              to={route}
                              className={styles.menuLink}
                              onClick={() => {
                                if (!scrollToSelector) return;
                                window.scrollTo({
                                 top: document.querySelector(scrollToSelector).offsetTop,
                                 behavior: "smooth",
                                })
                              }}
                            >
                              {translate(translateId)}
                            </Link>
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
                      </div>)
                    })
                  }
                  <div className={styles.language}>
                    <Language />
                  </div>
                </div>
                <i
                  className={classNames('fas fa-bars', styles.mobileMenuLink)}
                  onClick={() => setShowSideMenu(!showSideMenu)}
                />
              </div>
            </div>
            <div className={styles.sloganBlock}>
              <h1 className={styles.slogan}>{translate('SLOGAN_TITE')}</h1>
              <div className={styles.sloganDescription}>{translate('SLOGAN_DESCRIPTION')}</div>
            </div>
            <SelectVisitorType />
            <Drawer
              placement="right"
              onClose={() => setShowSideMenu(false)}
              visible={showSideMenu}
            >
              {
                MENU_ITEMS.map(({ translateId, route, scrollToSelector }) => {
                  return (
                    <div
                      key={translateId}
                      className={styles.mobileMenuItem}
                    >
                      {
                        route ? (
                          <Link
                            to={route}
                            onClick={() => {
                              if (!scrollToSelector) return;
                              window.scrollTo({
                               top: document.querySelector(scrollToSelector).offsetTop,
                               behavior: "smooth",
                             });
                             setShowSideMenu(false);
                            }}
                          >
                            {translate(translateId)}
                          </Link>
                        ) : (
                          <a
                            onClick={() => {
                              window.scrollTo({
                                top: document.querySelector(scrollToSelector).offsetTop,
                                behavior: "smooth",
                              });
                              setShowSideMenu(false);
                            }}
                          >
                            {translate(translateId)}
                          </a>
                        )
                      }
                    </div>
                  )
                })
              }
              <div className={styles.mobileLanguage}>
                <Language />
              </div>
            </Drawer>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withLocalize,
  withRouter,
  withState('showSideMenu', 'setShowSideMenu', false),
  withUser(),
  pure,
)(Top);

Top.defaultProps = {
  userInfo: null,
};
Top.propTypes = {
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  showSideMenu: PropTypes.bool.isRequired,
  setShowSideMenu: PropTypes.func.isRequired,
};
