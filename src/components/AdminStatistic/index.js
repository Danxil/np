import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, lifecycle, branch, renderNothing } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withAdminStatistic from '../../containers/withAdminStatistic';
import withWithdraws from '../../containers/withWithdraws';
import withWithdrawsActions from '../../containers/withWithdrawsActions';
import Withdraws from '../common/Withdraws';
import withUser from '../../containers/withUser';
import StatisticField from './StatisticField';
import Users from './Users';
import styles from './index.module.scss';

const AdminStatistic = ({ translate, adminStatistic, withdraws }) => {
  return (
    <Container>
      <PageTitle>{translate('ADMIN_STATISTIC')}</PageTitle>
      <div className={styles.content}>
        <h2>WITHDRAWS</h2>
        <Withdraws withdraws={withdraws} />
        {
          adminStatistic.fields.map(o => (<StatisticField key={`field-${o.label}`} field={o} />))
        }
        <h2>Users</h2>
        <Users />
      </div>
    </Container>
  )
};

export default compose(
  withAdminStatistic(),
  withUser(),
  withWithdraws(),
  withWithdrawsActions(),
  withLocalize,
  lifecycle({
    componentDidMount() {
      this.props.getAdminStatistic();
      this.props.getUsersForAdminStatistic();
      this.props.getWithdraws();
    }
  }),
  branch(
    ({ adminStatistic }) => adminStatistic === null,
    renderNothing,
  ),
  pure,
)(AdminStatistic);

AdminStatistic.defaultProps = {
  adminStatistic: null,
};

AdminStatistic.propTypes = {
  translate: PropTypes.func.isRequired,
  adminStatistic: PropTypes.object,
  withdraws: PropTypes.array,
};
