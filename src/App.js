import React from 'react';
import { Layout } from 'antd';
import { renderToStaticMarkup } from 'react-dom/server';
import classNames from 'classnames';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router';
import { branch, compose, lifecycle, pure, renderComponent, withHandlers, withState } from 'recompose';
import { withLocalize } from 'react-localize-redux';

import Providers, { history } from './redux/Providers';
import AuthenticatedRoute from './common/AuthenticatedRoute';

import Content from './components/Content';
import Main from './components/Main';
import Tables from './components/Tables';
import Footer from './components/Footer';
import withUser from './containers/withUser';
import withMeta from './containers/withMeta';
import withGameConfig from './containers/withGameConfig';
import withTables from './containers/withTables';
import localization from './localization';
import Spinner from './common/Spinner';



const AppComp = ({
  classes,
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
        <Header
          collapsedSideMenu={isMobile ? collapsedSideMenu : false}
          setCollapsedSideMenu={setCollapsedSideMenuFn}
        />
        <div
          className={classNames(
            classes.content, {
              'collapsed-mode': isMobile ? collapsedSideMenu : false,
              notAuthenticated: !userInfo,
            })}
        >
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Content>
          <Footer />
          <Spinner spinnerKey="GAME_CHOOSE" overlay={true} noFadeIn={true} fixed={true} />
        </div>
      </Layout>
    </Layout>
  );
};

const styles = {
  content: {
    'margin-top': 64,
    marginLeft: 200,
    transition: 'all .2s',
    '&.collapsed-mode': {
      'margin-left': 80,
    },
    '&.notAuthenticated': {
      '@media(min-width: 1101px)': {
        marginLeft: '0 !important',
      },
    },
    '@media(max-width: 666px)': {
      marginLeft: '0 !important',
    }
  },
};

const App = compose(
  withRouter,
  withLocalize,
  withTables(),
  withUser(),
  withMeta(),
  withGameConfig(),
  injectSheet(styles),
  lifecycle({
    componentDidMount() {
      let browserLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
      if (browserLanguage !== 'ru') browserLanguage = 'gb';
      this.props.getUserInfo();
      this.props.getGameConfig();
      this.props.getTables();
      window.onblur = () => this.props.setAppInFocus(false);
      window.onfocus = () => this.props.setAppInFocus(true);
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
    ({ userInfoRequestDone, gameConfig, tablesList }) => !userInfoRequestDone || !gameConfig || !tablesList.length,
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
  classes: PropTypes.object.isRequired,
  gameConfig: PropTypes.object,
  userInfo: PropTypes.object,
  collapsedSideMenu: PropTypes.bool.isRequired,
  setCollapsedSideMenu: PropTypes.func.isRequired,
  setCollapsedSideMenuFn: PropTypes.func.isRequired,
  getGameConfig: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

export default () => {
  return (
    <Providers>
      <App history={history} />
    </Providers>
  );
};
