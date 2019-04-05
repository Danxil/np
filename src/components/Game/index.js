import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, pure, lifecycle } from 'recompose';
import { Button, Card, Col, Row, Progress } from 'antd';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withSupport from '../../containers/withSupport';
import withUser from '../../containers/withUser';
import withGamesActions from '../../containers/withGamesActions';
import withGames from '../../containers/withGames';

const Game = ({
  translate,
  games,
}) => {
  return (
    <div className={classNames(styles.game)}>
      <Container>
        <PageTitle>{translate('MULTIPLIER')}</PageTitle>
        <Button className={styles.addBtn} type="primary" size="large" shape="circle" icon="plus" />
        <Row gutter={10} type="flex" justify="center">
          {
            games.map((game) => (
              <Col key={`lot${Math.random()}`} span={6}>
                <Card className={styles.lot} title={game.creatorUser.displayName} bordered={false}>
                  <div className={styles.progress}>
                    <Progress
                      size="small"
                      status="active"
                      percent={75}
                      format={() => `2 ${translate('MIN').toLowerCase()}`}
                    />
                  </div>
                  <p className={styles.bet}>{translate('BET')}: {game.bet}$</p>
                  <Button type="primary">{translate('START')}</Button>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  );
}

Game.defaultProps = {
};

Game.propTypes = {
  translate: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

export default compose(
  withSupport(),
  withRouter,
  withLocalize,
  withUser(),
  withGames(),
  withGamesActions(),
  lifecycle({
    componentDidMount() {
      this.props.initWs();
    },
    componentWillUnmount() {
      this.props.closeWs();
    }
  }),
  pure,
)(Game);
