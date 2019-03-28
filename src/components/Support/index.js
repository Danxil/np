import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize, Translate } from 'react-localize-redux';
import { compose, pure, withHandlers, withProps } from 'recompose';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import Recaptcha from 'react-google-recaptcha';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withSupport from '../../containers/withSupport';

const FormItem = Form.Item;

const Support = ({
  translate,
  // submit,
  form: { getFieldDecorator },
  capcha,
  executeCapcha,
}) => {
  return (
    <div className={classNames(styles.support, 'feebackBlock')}>
      <Container>
        <div className={styles.form}>
          <div className={styles.content}>
            <PageTitle>{translate('FEEDBACK')}</PageTitle>
            <Form className={styles.fields} onSubmit={executeCapcha}>
              <FormItem
                required={false}
                label={translate('EMAIL_TO_CONTACT_YOU')}
              >
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: <Translate id={'PLEASE_FILL_THIS_FIELD'} />},
                    { type: 'email', message: <Translate id={'EMAIL_IS_NOT_VALID'} /> },
                  ],
                })(
                  <Input placeholder={translate('EMAIL_TO_CONTACT_YOU')} />
                )}
              </FormItem>
              <FormItem
                required={false}
                label={translate('SUBJECT')}
              >
                {getFieldDecorator('subject', {
                  rules: [
                    { required: true, message: <Translate id={'PLEASE_FILL_THIS_FIELD'} />},
                  ],
                })(
                  <Input placeholder={translate('SUBJECT')} />
                )}
              </FormItem>
              <FormItem
                required={false}
                label={translate('YOUR_QUESTION')}
              >
                {getFieldDecorator('text', {
                  rules: [
                    { required: true, message: <Translate id={'PLEASE_FILL_THIS_FIELD'} />},
                  ],
                })(
                  <Input.TextArea rows={4} placeholder={translate('YOUR_QUESTION')} />
                )}
              </FormItem>
              <div className={styles.btnWrapper}>
                <Button
                  htmlType="submit"
                  type="primary"
                >
                  {translate('SEND')}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
      <Recaptcha
        ref={capcha}
        sitekey="6LftY5oUAAAAAD5phtTh1MTUHVVMPVZe1c7op8d1"
        size="invisible"
      />
    </div>
  );
}

Support.defaultProps = {
};

Support.propTypes = {
  createSupportTicket: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  executeCapcha: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  capcha: PropTypes.object.isRequired,
};

export default compose(
  Form.create(),
  withSupport(),
  withProps(() => ({
    capcha: React.createRef(),
  })),
  withHandlers({
    submit: ({
      createSupportTicket,
      form: { validateFields, resetFields }
    }) => () => {
      console.log(222);
      validateFields((err, values) => {
        if (!err) {
          createSupportTicket(values);
          resetFields();
        }
      });
    }
  }),
  withHandlers({
    executeCapcha: ({ capcha }) => (e) => {
      e.preventDefault();
      console.log(11, capcha.current.execute);
      capcha.current.execute();
    }
  }),
  withRouter,
  withLocalize,
  pure,
)(Support);
