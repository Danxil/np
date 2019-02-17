import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, lifecycle, branch, renderNothing } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withAdminStatistic from '../../containers/withAdminStatistic';
import Withdraws from '../common/Withdraws';
import StatisticField from './StatisticField';

const AdminStatistic = ({ translate, adminStatistic }) => {
  return (
    <Container>
      <PageTitle>{translate('ADMIN_STATISTIC')}</PageTitle>
      <div>
        <h2>WITHDRAWS</h2>
        <Withdraws maxItems={9999999} />
        {
          adminStatistic.fields.map(o => (<StatisticField key={`field-${o.label}`} field={o} />))
        }
      </div>
    </Container>
  )
};

export default compose(
  withAdminStatistic(),
  withLocalize,
  lifecycle({
    componentDidMount() {
      this.props.getAdminStatistic()
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
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  adminStatistic: PropTypes.object,
};
