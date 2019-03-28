import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { withLocalize } from 'react-localize-redux';
import Language from '../common/Language';
import { compose, pure } from 'recompose';
import Container from '../common/Container';
import styles from './index.module.scss';
import Menu from '../Main/Top/Menu';

const { Footer: FooterAnt } = Layout;

const Footer = ({ translate }) => {
  return (
    <FooterAnt className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.footerItem}>
            <Menu menuLinkClassName={styles.menuLink} />
          </div>
          <div className={styles.footerItem}>© 2018 fast-credit.in</div>
          <div className={styles.footerItem}>
            <div className={styles.email}>
              {translate('IF_YOU_HAVE_ANY_QUESTIONS_WRITE_US')}:<br/><small>danxilggggaa@gmail.com</small>
            </div>
            <div className={styles.language}>
              <Language />
            </div>
          </div>
        </div>
      </Container>
    </FooterAnt>
  );
}

Footer.defaultProps = {
  userData: null,
};

Footer.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default compose(
  withLocalize,
  pure,
)(Footer);
