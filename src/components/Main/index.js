import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { compose, withState, withHandlers, pure } from 'recompose';
import withUser from '../../containers/withUser';

const Main = ({
  translate,
}) => {
  return (
    <Fragment>
      <h2>
        {translate('LOTS')}
      </h2>
    </Fragment>
  );
};

export default compose(
  withLocalize,
  withUser(),
  withState('createGameMode', 'setCreateGameMode', false),
  withHandlers({
    handleSubmit: ({ notifyCreateGame, setCreateGameMode }) => (values) => {
      notifyCreateGame({ game: values });
      setCreateGameMode(false);
    },
    createGame: ({ setCreateGameMode }) => () => {
      setCreateGameMode(true);
    },
    cancelCreateGame: ({ setCreateGameMode }) => () => {
      setCreateGameMode(false);
    },
  }),
  pure,
)(Main);

Main.defaultProps = {
  activeGame: null,
};

Main.propTypes = {
  translate: PropTypes.func.isRequired,
};
