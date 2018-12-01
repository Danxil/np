import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { compose, pure } from 'recompose';
import styles from './index.module.css';

const { Content: ContentAnt } = Layout;

class Content extends Component {
  render() {
    return (
      <ContentAnt className={styles.contentWrapper}>
        <div className={styles.content}>
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
