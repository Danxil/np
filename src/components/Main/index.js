import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'antd';
import classNames from 'classnames';
import Container from '../common/Container';
import { compose, withState, withHandlers, pure } from 'recompose';
import withUser from '../../containers/withUser';
import Language from '../common/Language';
import styles from './index.module.scss';
import HowTo from '../common/HowTo';

export const MENU_ITEMS = [
  {
    translateId: 'MAKE_INVESTMENT',
    route: '/',
    iconType: 'smile-o',
  },
  {
    translateId: 'GET_A_LOAN',
    route: '/',
    iconType: 'smile-o',
  },
  {
    translateId: 'ABOUT_THE_PROJECT',
    route: '/',
    iconType: 'smile-o',
  },
  {
    translateId: 'CONTACTS',
    route: '/',
    iconType: 'smile-o',
  },
]

const BUTTONS = [
  {
    translateId: 'MAKE_INVESTMENT',
  },
  {
    translateId: 'GET_A_LOAN',
  }
]

const DESCRIPTIONS = [
  {
    labelTranslateId: 'INVESTORS',
  },
  {
    labelTranslateId: 'BORROWERS',
  }
]

const HOW_TO = {
  investors: [
    {
      imageUrl: '/registration-screen.png',
      stepItemsKeys: [
        'HOW_TO_STEP_1_ITEM_1',
      ]
    },
    {
      imageUrl: '/demo-mode-activated.png',
      stepItemsKeys: [
          'HOW_TO_STEP_2_ITEM_2',
      ]
    },
  ],
}

const Main = ({
  translate,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.bg}>
        <div className={styles.bgInside}>
          <div className={styles.bgOverlay}></div>
          <div className={styles.bgShadow}></div>
          <div className={styles.content}>
            <Container>
              <div className={styles.header}>
                <div className={styles.logo}>
                  <a>FastCredit</a>
                </div>
                <div className={styles.rightBlock}>
                  <menu className={styles.menu}>
                    {
                      MENU_ITEMS.map(({ translateId }) => (
                        <li key={translateId} className={styles.menuItem}>
                          <a className={styles.menuLink}>{translate(translateId)}</a>
                        </li>
                      ))
                    }
                  </menu>
                  <Language />
                </div>
              </div>
              <div className={styles.sloganBlock}>
                <h1 className={styles.slogan}>{translate('SLOGAN_TITE')}</h1>
                <div className={styles.sloganDescription}>{translate('SLOGAN_DESCRIPTION')}</div>
              </div>
              <div className={styles.btnBlock}>
                {
                  BUTTONS.map(({ translateId }) => (
                    <Button
                      key={translateId}
                      type="primary"
                      className={classNames('ghostBtn', styles.btn)}
                      size="large"
                    >
                      {translate(translateId)}
                    </Button>
                  ))
                }
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className={styles.descriptionsWrapper}>
        <h1 className={styles.title}>{translate('HOW_IT_WORKS')}</h1>
        <div className={styles.descriptions}>
          {
            DESCRIPTIONS.map(({ labelTranslateId }) => (
              <div className={styles.description} key={labelTranslateId}>
                <h2 className={styles.descriptionTitle}>{translate(labelTranslateId)}</h2>
                <HowTo howTo={HOW_TO.investors} uniqKey="investors" />
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.howItWorks}>
        <div>
        </div>
      </div>
    </div>
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
