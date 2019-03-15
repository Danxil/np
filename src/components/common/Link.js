import React from 'react';
import { pure, compose } from 'recompose';
import { Link } from 'react-router-dom';

const LinkComp = (props) => {
  return <Link {...props} to={{ ...props.to, search: props.to.search || location.search }}>{props.children}</Link>;
};

export default compose(
  pure,
)(LinkComp);
