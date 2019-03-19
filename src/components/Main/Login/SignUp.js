import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Modal, Radio, Upload } from 'antd';
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
  form: { getFieldDecorator, getFieldValue },
  compareToFirstPassword,
  invitedById,
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
          invitedById && (
            <div className={styles.invitedByBlock}><span className={styles.invitedByText}>{translate('YOU_INVITED_BY_USER')}</span>: {invitedById}</div>
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
        {
          getFieldValue('accountType') === 'borrower' && (
            <FormItem
              label={translate('UPLOAD_SCANS_OR_PHOTO_OF_YOU_PASSPORT')}
            >
              <div className="dropbox">
                {
                  getFieldDecorator('fileList', {
                    valuePropName: 'fileList',
                    getValueFromEvent: (e) => {
                      console.log('Upload event:', e);
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList;
                    },
                  })(
                    <Upload.Dragger
                      name="files"
                      action="/upload.do"
                      beforeUpload={() => false}
                    >
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">{translate('CLICK_OR_DRAG_FILE_TO_THIS_AREA_TO_YPLOAD')}</p>
                      <p className="ant-upload-hint">{translate('SUPPORT_FOR_A_SINGLE_OR_BULK_UPLOAD')}</p>
                    </Upload.Dragger>
                  )
                }
              </div>
            </FormItem>
          )
        }
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
  invitedById: PropTypes.string,
};
