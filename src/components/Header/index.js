import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import RightBlock from './RightBlock';
import styles from './index.css';

export const TOP_MENU_ITEMS = [
  {
    route: '/home',
    translateId: 'ABOUT_THE_GAME',
    iconType: 'home',
  },
  {
    route: '/login',
    translateId: 'REGISTRATION',
    iconType: 'solution',
  },
  {
    route: '/how-to-play',
    translateId: 'HOW_TO_PLAY',
    iconType: 'question',
  },
  {
    route: '/statistic',
    translateId: 'STATISTIC',
    iconType: 'area-chart',
  },
  {
    route: '/withdraws',
    translateId: 'WITHDRAWS',
    iconType: 'wallet',
  },
  {
    route: '/contacts',
    translateId: 'CONTACTS',
    iconType: 'book',
  },
];

const { Header: HeaderAnt } = Layout;

const Header = ({
  translate,
  location: { pathname },
  userInfo,
  setCollapsedSideMenu,
  collapsedSideMenu,
}) => {
  return (
    <HeaderAnt className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">FunSpin</Link>
      </div>
      <div className={styles.headerContent}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
          className={styles.topMenu}
          selectedKeys={[pathname]}
        >
          {
            TOP_MENU_ITEMS
              .filter(o => o.route !== '/login' || !userInfo).map(o => (
              <Menu.Item className="ant-menu-item" key={o.route}>
                <Link to={o.route}>
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
        <RightBlock />
        <Icon
          className={styles.trigger}
          type={collapsedSideMenu ? 'menu-unfold' : 'menu-fold'}
          onClick={setCollapsedSideMenu}
        />
     </div>
    </HeaderAnt>
  );
}

Header.defaultProps = {
  userData: null,
};

Header.propTypes = {
  setCollapsedSideMenu: PropTypes.func.isRequired,
  collapsedSideMenu: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

export default compose(
  withRouter,
  withUser(),
  withLocalize,
  pure,
)(Header);
