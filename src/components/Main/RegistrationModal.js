import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Icon, Button } from 'antd';
import { withLocalize, Translate } from 'react-localize-redux';
import { compose, pure, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import styles from './RegistrationModal.module.scss';
import Spinner from '../common/Spinner';

const FormItem = Form.Item;

const RegistrationModal = ({
  translate,
  form: { getFieldDecorator },
  compareToFirstPassword,
  handleSubmit,
  showModal,
  invitedBy,
  history,
}) => {
  return (
    <Modal
      className={styles.registration}
      title={translate('REGISTRATION')}
      visible={showModal === 'registration'}
      footer={[
        <div className={styles.btnWrapper} key="loginBtn" >
          <Spinner spinnerKey="LOGIN">
            <Button type="primary" onClick={handleSubmit}>
              {<Translate id={'REGISTER'} />}
            </Button>
          </Spinner>
        </div>
      ]}
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
            <Input prefix={<Icon type="mail" />} placeholder="Email" />
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
          {<Translate id={'OR'} />} <a onClick={() => {}}>{<Translate id={'LOG_IN'} />}</a> {<Translate id={'WITH_EXISTED_USER'} />}
        </div>
      </Form>
    </Modal>
  );
};

export default compose(
  Form.create(),
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
      showModal: showModal,
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
)(RegistrationModal);

RegistrationModal.defaultProps = {
  invitedBy: null,
  showModal: null,
};

RegistrationModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showModal: PropTypes.string,
  invitedBy: PropTypes.string,
};
