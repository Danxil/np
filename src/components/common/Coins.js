import React from 'react';
import { pure, compose} from 'recompose';

const Coins = () => {
  return <span>$</span>
};

export default compose(pure)(Coins);

Coins.propTypes = {
};
