import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router';
import { compose, pure } from 'recompose';
import { getReasignedSearchQuery } from '../../../helpers/utils';
import withUser from '../../../containers/withUser';
import Container from '../../common/Container';
import Language from '../../common/Language';
import Link from '../../common/Link';
import SelectVisitorType from './SelectVisitorType';

import styles from './index.module.scss';

export const MENU_ITEMS = [
  {
    translateId: 'SIGN_UP',
    route: { pathname: './', search: { showModal: 'sign-up' } },
    iconType: 'smile-o',
  },
  {
    translateId: 'SIGN_IN',
    route: { pathname: './', search: { showModal: 'sign-in' } },
    iconType: 'smile-o',
  },
  {
    translateId: 'HOW_IT_WORKS',
    scrollToSelector: '.descriptionBlock',
    iconType: 'smile-o',
  },
  {
    translateId: 'INVEST',
    scrollToSelector: '.tariffsBlock',
    iconType: 'smile-o',
  },
  {
    translateId: 'PARTNER_PROGRAM',
    scrollToSelector: '.partnersBlock',
    iconType: 'smile-o',
  }
];

const Top = ({
  translate,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.bg}>
        <div className={styles.bgInside}>
        </div>
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
                    MENU_ITEMS.map(({ translateId, route, scrollToSelector }) => {
                      return (<li key={translateId} className={styles.menuItem}>
                        {
                          route ? (
                            <Link to={{ ...route, search: getReasignedSearchQuery(route.search) }} className={styles.menuLink}>{translate(translateId)}</Link>
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
                      </li>)
                    })
                  }
                </menu>
                <Language />
              </div>
            </div>
            <div className={styles.sloganBlock}>
              <h1 className={styles.slogan}>{translate('SLOGAN_TITE')}</h1>
              <div className={styles.sloganDescription}>{translate('SLOGAN_DESCRIPTION')}</div>
            </div>
            <SelectVisitorType />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withLocalize,
  withRouter,
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
