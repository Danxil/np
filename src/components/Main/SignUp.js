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

const SignUp = ({
  translate,
  form: { getFieldDecorator },
  compareToFirstPassword,
  invitedBy,
  handleSubmit,
  showModal,
  history,
}) => {
  return (
    <Modal
      className={styles.loginModal}
      title={translate('SIGN_UP')}
      visible={showModal === 'sign-up'}
      footer={
        <Spinner spinnerKey="LOGIN">
          <Button type="primary" onClick={handleSubmit}>
            {<Translate id={'REGISTER'} />}
          </Button>
        </Spinner>
      }
      onOk={() => {}}
      onCancel={() => {history.push(`/${location.search}`)}}
    >
      <Form>
        { invitedBy && <div className={styles.invitedByBlock}><span className={styles.invitedByText}>{translate('YOU_INVITED_BY_USER')}</span>: {invitedBy}</div> }
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: <Translate id={'PLEASE_ENTER_YOU_EMAIL'} /> },
              { type: 'email', message: <Translate id={'EMAIL_IS_NOT_VALID'} /> },
            ],
          })(
            <Input prefix={<Icon type='mail' />} placeholder='Email' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('nickname', {
            rules: [
              { required: true, message: <Translate id={'PLEASE_ENTER_YOU_NICKNAME'} />},
            ],
          })(
            <Input prefix={<Icon type="user" />} placeholder={translate('NICKNAME')} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: <Translate id={'PLEASE_ENTER_YOU_PASSWORD'} /> }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PASSWORD')} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('repeatPassword', {
            rules: [
              {
                required: true, message: <Translate id={'PLEASE_REPEAT_PASSWORD'} />
              },
              {
                validator: compareToFirstPassword,
              }
            ],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PLEASE_REPEAT_PASSWORD')} />
          )}
        </FormItem>
        <div className={styles.linksBlock}>
          <Link to={{ pathname: '/sign-in' }}>{<Translate id={'LOG_IN'} />}</Link> {<Translate id={'WITH_EXISTED_USER'} />}
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
      invitedBy: query.get('invitedBy'),
      showModal,
    });
  }),
  withHandlers({
    handleSubmit: ({ signUp, form: { validateFields } }) => () => {
      validateFields((err, values) => {
        if (!err) {
          signUp(values);
        }
      });
    }
  }),
  pure,
)(SignUp);

SignUp.defaultProps = {
  invitedBy: null,
  showModal: null,
};

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  invitedBy: PropTypes.string,
  showModal: PropTypes.string,
};
