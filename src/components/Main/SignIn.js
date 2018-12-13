import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Modal } from 'antd';
import { withLocalize, Translate } from 'react-localize-redux';
import { compose, pure, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import Spinner from '../common/Spinner';
import Link from '../common/Link';
import styles from './LoginModal.module.scss';

const FormItem = Form.Item;

const SignIn = ({
  translate,
  form: { getFieldDecorator },
  handleSubmit,
  showModal,
  history,
}) => {
  return (
    <Modal
      className={styles.loginModal}
      title={translate('ENTER_DATA_OF_YOU_ACCOUNT')}
      visible={showModal === 'sign-in'}
      footer={
        <Spinner spinnerKey="LOGIN">
          <Button type="primary" onClick={handleSubmit}>
            {<Translate id={'LOG_IN'} />}
          </Button>
        </Spinner>
      }
      onOk={() => {}}
      onCancel={() => {history.push(`/${location.search}`)}}
    >
      <Form>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: <Translate id={'PLEASE_ENTER_YOU_EMAIL'} />},
              { type: 'email', message: <Translate id={'EMAIL_IS_NOT_VALID'} /> },
            ],
          })(
            <Input prefix={<Icon type="mail" />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: <Translate id={'PLEASE_ENTER_YOU_PASSWORD'} />}],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PASSWORD')} />
          )}
        </FormItem>
        <div className={styles.linksBlock}>
          <Link to={{ pathname: '/sign-up' }}>{<Translate id={'REGISTER'} />}</Link> {<Translate id={'NEW_USER'} />}
        </div>
      </Form>
    </Modal>
  );
};

export default compose(
  Form.create(),
  withUser(),
  withLocalize,
  withRouter,
  withProps(({ form, match: { params: { showModal } } }) => {
    let query = new URLSearchParams(location.search);
    return ({
      compareToFirstPassword: (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
          callback(<Translate id={'PASSWORDS_DO_NOT_MATCH'} />);
        } else {
          callback();
        }
      },
      showModal,
      invitedBy: query.get('invitedBy'),
    });
  }),
  withHandlers({
    handleSubmit: ({ signIn, form: { validateFields } }) => () => {
      validateFields((err, values) => {
        if (!err) {
          signIn(values);
        }
      });
    }
  }),
  pure,
)(SignIn);

SignIn.defaultProps = {
  invitedBy: null,
  showModal: null,
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  invitedBy: PropTypes.string,
  showModal: PropTypes.string,
};
