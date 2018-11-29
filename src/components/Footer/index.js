import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Select } from 'antd';
import Cookie from 'js-cookie'
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import styles from './index.css';

const { Footer: FooterAnt } = Layout;
const Option = Select.Option;

const Footer = ({ languages, activeLanguage, setActiveLanguage }) => {
  return (
    <FooterAnt className={styles.footer}>
      <div className={styles.logos}>
      </div>
      <div>© 2018 fun-spin.com</div>
      <div>
        <Select
          className={styles.language}
          defaultValue={activeLanguage.code}
          onChange={(value) => {
            setActiveLanguage(value);
            Cookie.set('language', value);
          }}
        >
          {
            languages.map(({ code, label }) => (
              <Option key={`language-${code}`} value={code}>
                <span className={`flag-icon flag-icon-${code}`}></span> {label.toUpperCase()}
              </Option>
            ))
          }
        </Select>
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
