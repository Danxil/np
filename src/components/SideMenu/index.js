import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose'
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router'
import { withLocalize } from 'react-localize-redux';
import { TOP_MENU_ITEMS } from '../Header';
import withUser from '../../containers/withUser';
import styles from './index.css';


const { Sider } = Layout;

const SIDE_MENU_ITEMS = [
  {
    route: '/',
    translateId: 'GAME',
    iconType: 'smile-o',
  },
  {
    route: '/withdraw',
    translateId: 'WITHDRAW',
    iconType: 'credit-card',
  },
  {
    route: '/by-coins',
    translateId: 'TOP_UP_THE_BALANCE',
    iconType: 'shopping-cart',
  },
];

class SideMenu extends Component {
  render() {
    const {
      className,
      collapsed,
      setCollapsedSideMenu,
      location: { pathname },
      translate,
      userInfo,
    } = this.props;
    return (
      <Sider
        className={
          classNames(
            'sideMenu',
            styles.content,
            styles.sider,
            className,
            {
              collapsed,
              notAuthenticated: !userInfo,
            }
          )
        }
        collapsible={isMobile ? true : false}
        collapsed={collapsed}
        onCollapse={setCollapsedSideMenu}
      >
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          className={classNames(styles.menu)}
        >
          {
            userInfo && SIDE_MENU_ITEMS.map(o => (
              <Menu.Item key={o.route} onClick={() => setCollapsedSideMenu(true)}>
                <Link to={o.route}>
                  <Icon type={o.iconType} />
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
          {
            TOP_MENU_ITEMS.filter(o => o.route !== '/login' || !userInfo).map(o => (
              <Menu.Item className={styles.topMenuDuplicateItem} onClick={() => setCollapsedSideMenu(true)} key={o.route}>
                <Link to={o.route}>
                  <Icon type={o.iconType} />
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
    )
  }
}

export default compose(
  withRouter,
  withUser(),
  withLocalize,
  pure
)(SideMenu);

SideMenu.defaultProps = {
  className: '',
  userInfo: null,
};

SideMenu.propTypes = {
  location: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  className: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  setCollapsedSideMenu: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};
