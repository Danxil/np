import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Select,
  Input,
  Alert,
} from 'antd';
import { compose, withState, withProps, pure, lifecycle } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import withWithdraws from '../../containers/withWithdraws';
import withWithdrawsActions from '../../containers/withWithdrawsActions';
import withBusinessConfig from '../../containers/withBusinessConfig';
import withUser from '../../containers/withUser';
import PageTitle from '../common/PageTitle';
import WithdrawsCommon from '../common/Withdraws';
import Container from '../common/Container';
import styles from './index.module.scss';

const FormItem = Form.Item;

const BILLING_SYSTEMS = [
  {
    label: 'PAYEER',
    id: 1,
  },
  {
    label: 'PERFECT MONEY',
    id: 2,
  },
  // {
  //   label: 'ADV CASH',
  //   id: 3,
  // },
];


const Withdraw = ({
  translate,
  userInfo: { balance },
  setAmount,
  amount,
  method,
  setMethod,
  setRequisite,
  form: { getFieldDecorator },
  handleSubmit,
  businessConfig: { MIN_AMOUNT_OF_WITHDRAWING },
  withdraws,
}) => {
  const lowBalance = balance < 1;
  return (
    <div className={styles.withdrawing}>
      <Container>
        <PageTitle>{translate('WITHDRAW')}</PageTitle>
        <div className={styles.content}>
          <Form id="withdrawing" noValidate className={styles.withdrawingForm}>
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
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      validator(rule, value, callback) {
                        if (value < MIN_AMOUNT_OF_WITHDRAWING) {
                          callback(translate('VALUE_TOO_LOW'));
                        } else {
                          callback();
                        }
                      }
                    },
                    {
                      validator(rule, value, callback) {
                        if (value > balance) {
                          callback(translate('VALUE_TOO_BIG'));
                        } else {
                          callback();
                        }
                      }
                    }
                  ],
                  initialValue: amount,
                })(
                  <Input
                    suffix="$"
                    step={0.1}
                    type="number"
                    min={MIN_AMOUNT_OF_WITHDRAWING}
                    max={balance}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value)
                      setAmount(!isNaN(val) ? val: 0);
                    }}
                  />
                )}
              </div>
            </FormItem>
            <FormItem
              label={translate('WITHDRAWAL_SERVICE')}
              required={false}
            >
              <Select
                value={method}
                disabled={lowBalance}
                onChange={(val) => setMethod(val)}
              >
                {
                  BILLING_SYSTEMS.map(o => (
                    <Select.Option key={JSON.stringify(o)} value={o.label}>{o.label}</Select.Option>
                  ))
                }
              </Select>
            </FormItem>
            <FormItem
              label={translate('CARD_OR_ACCOUNT_NUMBER')}
              required={false}
            >
              {getFieldDecorator('requisite', {
                rules: [{ required: true, message: <span>{translate('THIS_FIELD_IS_REQUIRED')}</span> }],
              })(
                <Input
                  disabled={lowBalance}
                  placeholder={translate('CARD_OR_ACCOUNT_NUMBER')}
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
          <WithdrawsCommon withdraws={withdraws} />
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  withWithdraws(),
  withWithdrawsActions(),
  withUser(),
  withBusinessConfig(),
  withState('amount', 'setAmount', ({ businessConfig: { MIN_AMOUNT_OF_WITHDRAWING } }) => MIN_AMOUNT_OF_WITHDRAWING),
  withState('method', 'setMethod', BILLING_SYSTEMS[0].label),
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
  lifecycle({
    componentDidMount() {
      this.props.getWithdraws({ filter: { userId: this.props.userInfo.id } });
    }
  }),
  pure,
)(Withdraw);

Withdraw.defaultProps = {
};

Withdraw.propTypes = {
  translate: PropTypes.func.isRequired,
  getWithdraws: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  withdraws: PropTypes.array.isRequired,
  setAmount: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  method: PropTypes.string.isRequired,
  setMethod: PropTypes.func.isRequired,
  setRequisite: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  businessConfig: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
