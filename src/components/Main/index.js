import React from 'react';
import { compose, pure } from 'recompose';
import withUser from '../../containers/withUser';
import Top from './Top';
import Description from './Description';
import Achievements from './Achievements';
import Tariffs from './Tariffs';

const Main = () => {
  return (
    <div>
      <Top />
      <Description />
      <Achievements />
      <Tariffs />
    </div>
  );
};

export default compose(
  withUser(),
  pure,
)(Main);
