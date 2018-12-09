import React from 'react';
import { compose, pure } from 'recompose';
import Top from './Top';
import Description from './Description';
import Achievements from './Achievements';
import Tariffs from './Tariffs';
import Partners from './Partners';
import RegistrationModal from './RegistrationModal';

const Main = () => {
  return (
    <div>
      <Top />
      <Description />
      <Achievements />
      <Tariffs />
      <Partners />
      <RegistrationModal />
    </div>
  );
};

export default compose(
  pure,
)(Main);
