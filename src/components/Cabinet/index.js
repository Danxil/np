import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router'

import { compose, pure } from 'recompose';
import styles from './index.module.css';
import MyIvestments from '../MyIvestments';
import Replenish from '../Replenish';
import Withdraw from '../Withdraw';
import withUser from '../../containers/withUser';
import Link from '../common/Link'

const {
  Content, Sider, Header
} = Layout;

const SIDE_MENU_ITEMS = [
  {
    route: '/',
    translateId: 'MAKE_INVESTMENT',
    iconType: 'credit-card',
  },
  {
    route: '/my-investments',
    translateId: 'MY_INVESTMENTS',
    iconType: 'smile-o',
  },
  {
    route: '/withdraw',
    translateId: 'WITHDRAW',
    iconType: 'hand-holding-usd',
  },
];

const Cabinet = ({
  translate,
  match,
  location: { pathname },
  userInfo,
}) => {
  return (
    <div className={styles.cabinet}>
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.balance}>Balance: {userInfo.balance} $</div>
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
                    <Icon type={o.iconType} />
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
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};
