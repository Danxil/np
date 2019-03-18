import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router-dom';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import styles from './index.module.scss';
import MyIvestments from '../MyIvestments';
import Replenish from '../Replenish';
import Withdraw from '../Withdraw';
import withUser from '../../containers/withUser';
import Link from '../common/Link'
import { toFixedIfNeed } from '../../helpers/utils';
import ForPartners from '../ForPartners';
import GiveLoan from '../GiveLoan';

const {
  Content, Sider, Header
} = Layout;

const SIDE_MENU_ITEMS = [
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
    translateId: 'GIVEN_LOANS',
  },
  {
    route: '/withdraw',
    translateId: 'WITHDRAW',
  },
  {
    route: '/for-partners',
    translateId: 'FOR_PARTNERS',
  },
];

const Cabinet = ({
  translate,
  match,
  location: { pathname },
  userInfo,
  logout,
}) => {
  return (
    <div className={styles.cabinet}>
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.rightBlock}>
          <div className={classNames(styles.balance, styles.item)}>{translate('PROFIT')}: {toFixedIfNeed(userInfo.balance)} $</div>
          <div className={classNames(styles.logOut, styles.item)}>
            <a onClick={logout}>
              {translate('LOG_OUT')}&nbsp;<Icon type="logout" />
            </a>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={false}
          onCollapse={() => {}}
        >
          <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
            {
              SIDE_MENU_ITEMS.map(o => {
                const to = `${match.path}${o.route}`;
                return (<Menu.Item key={to}>
                  <Link to={{ pathname: to }}>
                    <span>{translate(o.translateId)}</span>
                  </Link>
                </Menu.Item>)
                }
              )
            }
          </Menu>
        </Sider>
        <Content>
          <div>
            <AuthenticatedRoute path={`${match.path}`} exact component={Replenish}/>
            <AuthenticatedRoute path={`${match.path}/my-investments`} exact component={MyIvestments}/>
            <AuthenticatedRoute path={`${match.path}/withdraw`} exact component={Withdraw}/>
            <AuthenticatedRoute path={`${match.path}/for-partners`} component={ForPartners} />
            <AuthenticatedRoute path={`${match.path}/give-a-loan`} component={GiveLoan} />
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default compose(
  withLocalize,
  withRouter,
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
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};
