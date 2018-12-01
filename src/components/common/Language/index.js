import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import Cookie from 'js-cookie'
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';

const Option = Select.Option;

const Language = ({ languages, activeLanguage, setActiveLanguage }) => {
  return (
    <div className={styles.language}>
      <Select
        defaultValue={activeLanguage.code}
        value={activeLanguage.code}
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
  );
}

Language.defaultProps = {
  userData: null,
};

Language.propTypes = {
  setActiveLanguage: PropTypes.func.isRequired,
  activeLanguage: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
};

export default compose(
  withLocalize,
  pure,
)(Language);
