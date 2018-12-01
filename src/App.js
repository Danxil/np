import React from 'react';
import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';
import { renderToStaticMarkup } from 'react-dom/server';
import classNames from 'classnames';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router';
import { branch, compose, lifecycle, pure, renderComponent, withHandlers, withState } from 'recompose';
import { withLocalize } from 'react-localize-redux';

import Providers, { history } from './redux/Providers';

import Content from './components/Content';
import Main from './components/Main';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import withUser from './containers/withUser';
import localization from './localization';
import Spinner from './components/common/Spinner';

import styles from './App.module.css';

const AppComp = ({
  collapsedSideMenu,
  setCollapsedSideMenuFn,
  userInfo,
}) => {
  return (
    <Layout className="layout">
      <SideMenu
        collapsed={isMobile ? collapsedSideMenu : false}
        setCollapsedSideMenu={setCollapsedSideMenuFn}
      />
      <Layout>
        <div
          className={classNames(
            styles.content, {
              [styles.collapsedMode]: isMobile ? collapsedSideMenu : false,
              [styles.notAuthenticated]: !userInfo,
            }
          )}
        >
          <Content>
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </Content>
          <Footer />
        </div>
      </Layout>
    </Layout>
  );
};

const App = compose(
  withRouter,
  withLocalize,
  withUser(),
  lifecycle({
    componentDidMount() {
      let browserLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
      if (browserLanguage !== 'ru') browserLanguage = 'gb';
      this.props.getUserInfo();
      this.props.initialize({
        languages: [
          { label: 'EN', code: 'gb' },
          { label: 'RU', code: 'ru' }
        ],
        translation: localization,
        options: { renderToStaticMarkup, renderInnerHtml: true },
      });
      this.props.setActiveLanguage(Cookie.get('language') || browserLanguage);
    }
  }),
  withState('collapsedSideMenu', 'setCollapsedSideMenu', true),
  withHandlers({
    setCollapsedSideMenuFn: ({ setCollapsedSideMenu, collapsedSideMenu }) => (val) => {
      return setCollapsedSideMenu(typeof(val) === 'boolean' ? val : !collapsedSideMenu);
    }
  }),
  branch(
    ({ userInfoRequestDone }) => !userInfoRequestDone,
    renderComponent(() => <Spinner overlay={true} transparentOverlay={true} />),
  ),
  pure,
)(AppComp);

AppComp.defaultProps = {
  gameConfig: null,
};

AppComp.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  collapsedSideMenu: PropTypes.bool.isRequired,
  setCollapsedSideMenu: PropTypes.func.isRequired,
  setCollapsedSideMenuFn: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

export default () => {
  return (
    <Providers>
      <App history={history} />
    </Providers>
  );
};
