import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getReasignedSearchQuery } from '../../helpers/utils';
import { compose, pure, lifecycle, branch, renderNothing, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import withUser from '../../containers/withUser';
import withBusinessConfig from '../../containers/withBusinessConfig';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Login = ({ showModal, cancelLogin }) => {
  return (
    <Fragment>
      {showModal === 'sign-in' && (<SignIn cancelLogin={cancelLogin} />)}
      {showModal === 'sign-up' && (<SignUp cancelLogin={cancelLogin} />)}
    </Fragment>
  );
};

export default compose(
  withRouter,
  withUser(),
  withBusinessConfig(),
  withProps(() => {
    const query = new URLSearchParams(location.search);
    return ({
      showModal: query.get('showModal'),
    });
  }),
  withHandlers({
    cancelLogin: ({ history }) => () => {
      const query = queryString.parse(location.search);
      delete query.showModal;
      history.push(`?${getReasignedSearchQuery({ showModal: null })}`);
    }
  }),
  lifecycle({
    componentDidUpdate() {
      const { history, userInfo, showModal } = this.props;
      if (userInfo && (showModal === 'sign-up' || showModal === 'sign-in')) {
        const query = queryString.parse(location.search);
        delete query.showModal;
        history.push(`./?${queryString.stringify(query)}`);
      }
    },
  }),
  branch(
    ({
      businessConfig,
    }) => !businessConfig,
    renderNothing,
  ),
  pure,
)(Login);

Login.defaultProps = {
  showModal: null,
};

Login.propTypes = {
  showModal: PropTypes.string,
  cancelLogin: PropTypes.func.isRequired,
};
