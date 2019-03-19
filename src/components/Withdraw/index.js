import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Slider,
  Form,
  Select,
  Input,
  Alert,
} from 'antd';
import { compose, withState, withProps, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import withWithdraws from '../../containers/withWithdraws';
import withBusinessConfig from '../../containers/withBusinessConfig';
import withUser from '../../containers/withUser';
import PageTitle from '../common/PageTitle';
import WithdrawsCommon from '../common/Withdraws';
import Container from '../common/Container';
import styles from './index.module.scss';


const FormItem = Form.Item;

const WITHDRAW_METHODS = [
  {
    value: 'payeer',
    label: 'Payeer',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
  {
    value: 'qiwi',
    label: 'QIWI',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
  {
    value: 'perfectMoney',
    label: 'PerfectMoney',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
];

const Withdraw = ({
  translate,
  userInfo: { balance, id: userId },
  setAmount,
  amount,
  method,
  setMethod,
  setRequisite,
  form: { getFieldDecorator },
  handleSubmit,
}) => {
  const lowBalance = balance < 1;
  return (
    <div className={styles.withdrawing}>
      <Container>
        <PageTitle>{translate('WITHDRAW')}</PageTitle>
        <div className={styles.content}>
          <Form id="withdrawing" className={styles.withdrawingForm}>
            {
              lowBalance && (
                <FormItem>
                  <Alert
                    showIcon
                    message={`${translate('LOW_BALANCE')}. ${translate('INVEST_TO_GET_MONEY')}!`}
                    type="warning"
                  />
                </FormItem>
              )
            }
            <FormItem>
              <div>
                {amount}$
              </div>
              <div>
                <Slider
                  step={1}
                  defaultValue={1}
                  min={1}
                  max={Math.floor(balance)}
                  tipFormatter={(value) => (<span>{value}$</span>)}
                  onChange={(val) => setAmount(val)}
                  value={amount}
                  disabled={lowBalance}
                />
              </div>
            </FormItem>
            <FormItem>
              <Select
                value={method}
                disabled={lowBalance}
                onChange={(val) => setMethod(val)}
              >
                {
                  WITHDRAW_METHODS.map(o => (
                    <Select.Option key={JSON.stringify(o)} value={o.value}>{o.label}</Select.Option>
                  ))
                }
              </Select>
            </FormItem>
            <FormItem>
              {getFieldDecorator('requisite', {
                rules: [{ required: true, message: <span>{translate('THIS_FIELD_IS_REQUIRED')}</span> }],
              })(
                <Input
                  disabled={lowBalance}
                  placeholder={translate(WITHDRAW_METHODS.find(o => o.value === method).fieldPlaceholderTranslateId)}
                  onChange={(e) => setRequisite(e.target.value)}
                />
              )}
            </FormItem>
            <FormItem className={styles.btnBlock}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                disabled={lowBalance}
              >
                {translate('WITHDRAW')}
              </Button>
            </FormItem>
          </Form>
          <h3>{translate('WITHDRAW_HISTORY')}:</h3>
          <WithdrawsCommon filter={{ userId }} />
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  withWithdraws(),
  withUser(),
  withBusinessConfig(),
  withState('amount', 'setAmount', ({ businessConfig: { MIN_AMOUNT_OF_WITHDRAWING } }) => MIN_AMOUNT_OF_WITHDRAWING),
  withState('method', 'setMethod', WITHDRAW_METHODS[0].value),
  withState('requisite', 'setRequisite', ''),
  Form.create(),
  withProps(({ form, amount, method, requisite, createWithdraw }) => ({
    handleSubmit: () => {
      form.validateFields((err) => {
        if (!err) {
          createWithdraw({ amount, method, requisite });
        }
      });
    },
  })),
  pure,
)(Withdraw);

Withdraw.defaultProps = {
};

Withdraw.propTypes = {
  translate: PropTypes.func.isRequired,
  getWithdraws: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  setAmount: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  method: PropTypes.string.isRequired,
  setMethod: PropTypes.func.isRequired,
  setRequisite: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  businessConfig: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
