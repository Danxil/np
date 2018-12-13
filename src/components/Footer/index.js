import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { withLocalize } from 'react-localize-redux';
import Language from '../common/Language';
import { compose, pure } from 'recompose';
import styles from './index.module.css';

const { Footer: FooterAnt } = Layout;

const Footer = () => {
  return (
    <FooterAnt className={styles.footer}>
      <div>© 2018 fun-spin.com</div>
      <div className={styles.language}>
        <Language />
      </div>
    </FooterAnt>
  );
}

Footer.defaultProps = {
  userData: null,
};

Footer.propTypes = {
  setActiveLanguage: PropTypes.func.isRequired,
  activeLanguage: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
};

export default compose(
  withLocalize,
  pure,
)(Footer);
