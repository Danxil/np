import React from 'react';
import { compose, pure } from 'recompose';
import Top from './Top';
import Description from './Description';
import Achievements from './Achievements';
import Tariffs from './Tariffs';
import Partners from './Partners';

const Main = () => {
  return (
    <div>
      <Top />
      <Description />
      <Achievements />
      <Tariffs />
      <Partners />
    </div>
  );
};

export default compose(
  pure,
)(Main);
