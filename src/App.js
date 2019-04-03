import React from 'react';
import { Layout, BackTop } from 'antd';
import { renderToStaticMarkup } from 'react-dom/server';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Switch, withRouter, Route, Redirect } from 'react-router';
import { branch, compose, lifecycle, pure, renderComponent, withHandlers, withState } from 'recompose';
import { withLocalize } from 'react-localize-redux';

import Providers, { history } from './redux/Providers';

import Content from './components/Content';
import Main from './components/Main';
import Cabinet from './components/Cabinet';
import Footer from './components/Footer';
import withUser from './containers/withUser';
import withTariffs from './containers/withTariffs';
import withBusinessConfig from './containers/withBusinessConfig';
import localization from './localization';
import Spinner from './components/common/Spinner';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';
import NotAuthenticatedRoute from './components/common/NotAuthenticatedRoute';
import AdminStatistic from './components/AdminStatistic';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFail from './components/PaymentFail';
import styles from './App.module.scss';

const AppComp = () => {
  return (
    <Layout className="layout">
      <Content>
        <Switch>
          <Redirect from="/" to={{ pathname: '/investor', search: location.search }} exact />
          <NotAuthenticatedRoute exact path="/:visitorType(investor|borrower)?" component={Main} />
          <AuthenticatedRoute path="/cabinet" component={Cabinet} />
          <AuthenticatedRoute path="/admin-statistic" component={AdminStatistic} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/payment-fail" component={PaymentFail} />
        </Switch>
      </Content>
      <BackTop />
      <Footer />
      <a href="https://t.me/FastCreditIn" target="blank">
        <i className={classNames('fab fa-telegram-plane', styles.telegramLink)}></i>
      </a>
    </Layout>
  );
};

const App = compose(
  withRouter,
  withLocalize,
  withUser(),
  withBusinessConfig(),
  withTariffs(),
  lifecycle({
    componentDidMount() {
      let browserLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
      if (browserLanguage !== 'ru') browserLanguage = 'gb';
      this.props.getUserInfo();
      this.props.getBusinessConfig();
      this.props.getTariffs();
      this.props.initialize({
        languages: [
          { label: 'EN', code: 'gb' },
          { label: 'RU', code: 'ru' },
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
    ({ userInfoRequestDone, tariffs, businessConfig }) => !userInfoRequestDone || !tariffs.length || !businessConfig,
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
  getTariffs: PropTypes.func.isRequired,
};

export default () => {
  return (
    <Providers>
      <App history={history} />
    </Providers>
  );
};
