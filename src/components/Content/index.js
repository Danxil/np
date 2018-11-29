import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import styles from './index.css';

const { Content: ContentAnt } = Layout;

class Content extends Component {
  render() {
    const { className } = this.props;
    return (
      <ContentAnt className={classNames(className, styles.contentWrapper)}>
        <div className="content">
          {this.props.children}
        </div>
      </ContentAnt>
    )
  }
}

export default compose(pure)(Content);

Content.defaultProps = {
  className: '',
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
