import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { getReasignedSearchQuery } from '../../../helpers/utils';
import { compose, pure } from 'recompose';
import Link from '../../common/Link';

export const MENU_ITEMS = [
  {
    translateId: 'SIGN_UP',
    route: { search: getReasignedSearchQuery({ showModal: 'sign-up' }) },
    iconType: 'smile-o',
  },
  {
    translateId: 'SIGN_IN',
    route: { search: getReasignedSearchQuery({ showModal: 'sign-in' }) },
    iconType: 'smile-o',
  },
  {
    translateId: 'HOW_TO_GIVE_A_LOAN',
    scrollToSelector: '.descriptionBlock',
    route: { pathname: '/investor' },
    iconType: 'smile-o',
  },
  {
    translateId: 'HOW_TO_TAKE_A_LOAN',
    scrollToSelector: '.descriptionBlock',
    route: { pathname: '/borrower' },
    iconType: 'smile-o',
  },
  {
    translateId: 'PARTNER_PROGRAM',
    scrollToSelector: '.partnersBlock',
    iconType: 'smile-o',
  },
  {
    translateId: 'FEEDBACK',
    scrollToSelector: '.feebackBlock',
  }
];

const Menu = ({ translate, menuItemClassName, menuLinkClassName }) => {
  return (
    <Fragment>
      {
        MENU_ITEMS.map(({ translateId, route, scrollToSelector }) => {
          return (
          <div
            key={translateId}
            className={menuItemClassName}
          >
            {
              route ? (
                <Link
                  to={route}
                  className={menuLinkClassName}
                  onClick={() => {
                    if (!scrollToSelector) return;
                    window.scrollTo({
                     top: document.querySelector(scrollToSelector).offsetTop,
                     behavior: "smooth",
                    })
                  }}
                >
                  {translate(translateId)}
                </Link>
              ) : (
                <a
                  onClick={() => {
                    window.scrollTo({
                     top: document.querySelector(scrollToSelector).offsetTop,
                     behavior: "smooth",
                    })
                  }}
                  className={menuLinkClassName}
                >
                  {translate(translateId)}
                </a>
              )
            }
          </div>)
        })
      }
    </Fragment>
  );
}

Menu.defaultProps = {
  userData: null,
  menuItemClassName: '',
  menuLinkClassName: '',
};

Menu.propTypes = {
  translate: PropTypes.func.isRequired,
  menuItemClassName: PropTypes.string,
  menuLinkClassName: PropTypes.string,
};

export default compose(
  withLocalize,
  pure,
)(Menu);
