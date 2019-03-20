import React, { Fragment } from 'react';
import { Layout, Menu, Icon, Drawer, Affix } from 'antd';
import PropTypes from 'prop-types';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router-dom';
import { compose, pure, withState } from 'recompose';
import classNames from 'classnames';
import styles from './index.module.scss';
import MyIvestments from '../MyIvestments';
import Replenish from '../Replenish';
import Withdraw from '../Withdraw';
import withUser from '../../containers/withUser';
import Link from '../common/Link'
import Language from '../common/Language'
import { toFixedIfNeed } from '../../helpers/utils';
import ForPartners from '../ForPartners';
import GiveLoan from '../GiveLoan';
import TakeLoan from '../TakeLoan';

const {
  Content, Sider, Header
} = Layout;

const SIDE_MENU_ITEMS = {
  investor: [
    {
      route: '/',
      translateId: 'REPLENISH_BALANCE',
    },
    {
      route: '/give-a-loan',
      translateId: 'GIVE_A_LOAN',
    },
    {
      route: '/my-investments',
      translateId: 'ISSUED_LOANS',
    },
    {
      route: '/withdraw',
      translateId: 'WITHDRAW',
    },
    {
      route: '/for-partners',
      translateId: 'FOR_PARTNERS',
    },
  ],
  borrower: [
    {
      route: '/',
      translateId: 'TAKE_LOAN',
    },
    {
      route: '/my-loans',
      translateId: 'MY_LOANS',
    },
    {
      route: '/for-partners',
      translateId: 'FOR_PARTNERS',
    },
  ],
};

const Cabinet = ({
  translate,
  match,
  location: { pathname },
  userInfo,
  logout,
  setShowSideMenu,
  showSideMenu,
}) => {
  return (
    <div className={styles.cabinet}>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.logo}></div>
          <div className={styles.rightBlock}>
            {
              userInfo.accountType === 'investor' && (
                <div className={classNames(styles.balance, styles.item)}>
                  <Link to={{ pathname: '/cabinet/withdraw' }}>
                    {translate('PROFIT')}: {toFixedIfNeed(userInfo.balance)} $
                  </Link>
                </div>
              )
            }
            <div className={classNames(styles.logOut, styles.item)}>
              <span className={styles.email}>{userInfo.displayName}&nbsp;&nbsp;</span><a onClick={logout}><Icon type="logout" /></a>
            </div>
            <Affix>
              <i
                className={classNames('fas fa-bars', styles.mobileMenuLink)}
                onClick={() => setShowSideMenu(!showSideMenu)}
              />
            </Affix>
          </div>
        </Header>
        <Layout>
          <Sider
            className={styles.leftSideMenu}
            collapsed={false}
            onCollapse={() => {}}
          >
            <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
              {
                SIDE_MENU_ITEMS[userInfo.accountType].map(o => {
                  const to = `${match.path}${o.route}`;
                  return (<Menu.Item key={to}>
                    <Link to={{ pathname: to }}>
                      <span>{translate(o.translateId)}</span>
                    </Link>
                  </Menu.Item>)
                })
              }
            </Menu>
          </Sider>
          <Content className={styles.content}>
            {
              userInfo.accountType === 'investor' && (<Fragment>
                <AuthenticatedRoute path={`${match.path}`} exact component={Replenish}/>
                <AuthenticatedRoute path={`${match.path}/my-investments`} exact component={MyIvestments}/>
                <AuthenticatedRoute path={`${match.path}/withdraw`} exact component={Withdraw}/>
                <AuthenticatedRoute path={`${match.path}/give-a-loan`} component={GiveLoan} />
              </Fragment>)
            }
            {
              userInfo.accountType === 'borrower' && (<Fragment>
                <AuthenticatedRoute path={`${match.path}`} exact component={TakeLoan} />
                <AuthenticatedRoute path={`${match.path}/my-loans`} exact component={TakeLoan} />
              </Fragment>)
            }
            <AuthenticatedRoute path={`${match.path}/for-partners`} component={ForPartners} />
          </Content>
        </Layout>
      </Layout>
      <Drawer
        placement="right"
        onClose={() => setShowSideMenu(false)}
        visible={showSideMenu}
      >
        {
          SIDE_MENU_ITEMS[userInfo.accountType].map(o => {
            const to = `${match.path}${o.route}`;
            return (
              <div
                key={to}
                className={styles.mobileMenuItem}
                onClick={() => setShowSideMenu(false)}
              >
                <Link to={{ pathname: to }}>
                  <span>{translate(o.translateId)}</span>
                </Link>
              </div>
            )
          })
        }
        <div className={styles.language}>
          <Language />
        </div>
      </Drawer>
    </div>
  );
}

export default compose(
  withLocalize,
  withRouter,
  withState('showSideMenu', 'setShowSideMenu', false),
  withUser(),
  pure,
)(Cabinet);

Cabinet.defaultProps = {
  className: '',
  match: '',
};

Cabinet.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  className: PropTypes.string,
  logout: PropTypes.func.isRequired,
  setShowSideMenu: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
};
