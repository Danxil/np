import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Modal, Radio } from 'antd';
import { withLocalize, Translate } from 'react-localize-redux';
import { compose, pure, withProps, withHandlers } from 'recompose';
import { getReasignedSearchQuery } from '../../../helpers/utils';
import { withRouter } from 'react-router-dom';
import withUser from '../../../containers/withUser';
import Spinner from '../../common/Spinner';
import Link from '../../common/Link';
import styles from './index.module.scss';

const FormItem = Form.Item;

const SignUp = ({
  translate,
  form: { getFieldDecorator },
  compareToFirstPassword,
  invitedByNick,
  handleSubmit,
  cancelLogin,
  match: { params: { visitorType } },
}) => {
  return (
    <Modal
      className={styles.loginModal}
      title={translate('SIGN_UP')}
      visible
      footer={
        <Spinner spinnerKey="LOGIN">
          <Button type="primary" onClick={handleSubmit}>
            {<Translate id={'REGISTER'} />}
          </Button>
        </Spinner>
      }
      onOk={() => {}}
      onCancel={cancelLogin}
    >
      <Form>
        {
          invitedByNick && (
            <div className={styles.invitedByBlock}><span className={styles.invitedByText}>{translate('YOU_INVITED_BY_USER')}</span>: {invitedByNick}</div>
          )
        }
        <FormItem label={translate('ACCOUNT_TYPE')} required={false}>
          {getFieldDecorator('accountType', { initialValue: visitorType })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button size="small" value="borrower">{translate('BORROWER')}</Radio.Button>
              <Radio.Button size="small" value="investor">{translate('INVESTOR')}</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label={translate('EMAIL')} required={false}>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: <Translate id={'PLEASE_ENTER_YOU_EMAIL'} /> },
              { type: 'email', message: <Translate id={'EMAIL_IS_NOT_VALID'} /> },
            ],
          })(
            <Input prefix={<Icon type='mail' />} placeholder='Email' />
          )}
        </FormItem>
        <FormItem label={translate('PASSWORD')} required={false}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: <Translate id={'PLEASE_ENTER_YOU_PASSWORD'} /> }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PASSWORD')} />
          )}
        </FormItem>
        <FormItem label={translate('PLEASE_REPEAT_PASSWORD')} required={false}>
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
          <Link to={{ pathname: './', search: getReasignedSearchQuery({ showModal: 'sign-in' }) }}>{<Translate id={'LOG_IN'} />}</Link> {<Translate id={'WITH_EXISTED_USER'} />}
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
  withProps(() => ({ query: new URLSearchParams(location.search) })),
  withProps(({ form, query, match: { params: { showModal } } }) => {
    return ({
      compareToFirstPassword: (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
          callback(<Translate id={'PASSWORDS_DO_NOT_MATCH'} />);
        } else {
          callback();
        }
      },
      invitedByNick: query.get('invitedByNick'),
      invitedById: query.get('invitedById'),
      showModal,
    });
  }),
  withHandlers({
    handleSubmit: ({
      query,
      signUp,
      form: { validateFields },
    }) => () => {
      validateFields((err, values) => {
        if (err) return;
        const invitedById = query.get('invitedById') || null;
        signUp({ ...values, invitedById });
      });
    }
  }),
  pure,
)(SignUp);

SignUp.defaultProps = {
  invitedBy: null,
  invitedByNick: null,
};

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  cancelLogin: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  invitedBy: PropTypes.string,
  invitedByNick: PropTypes.string,
};
