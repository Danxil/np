import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import { withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { compose, pure } from 'recompose';
import styles from './index.module.css';
import Dashboard from '../Dashboard';
import Replenish from '../Replenish';

const {
  Content, Sider,
} = Layout;

const SIDE_MENU_ITEMS = [
  {
    route: '',
    translateId: 'DASHBOARD',
    iconType: 'smile-o',
  },
  {
    route: '/replenish',
    translateId: 'MAKE_INVESTMENT',
    iconType: 'credit-card',
  },
];

const Cabinet = ({ translate, match, location: { pathname } }) => {
  return (
    <div className={styles.cabinet}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={false}
        onCollapse={() => {}}
      >
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
          {
            SIDE_MENU_ITEMS.map(o => {
              const to = `${match.path}${o.route}`;
              return (<Menu.Item key={to}>
                <Link to={to}>
                  <Icon type={o.iconType} />
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>)
              }
            )
          }
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <AuthenticatedRoute path={`${match.path}`} exact component={Dashboard}/>
            <AuthenticatedRoute path={`${match.path}/replenish`} exact component={Replenish}/>
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
};
