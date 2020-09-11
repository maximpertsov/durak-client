import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Card as UICard, Label} from 'semantic-ui-react';

import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import size from 'lodash/fp/size';
import unzip from 'lodash/fp/unzip';

import get from 'lodash/get';

import { getAttackers, getDefender, getHands } from 'reducers';
import { MediaQuery } from 'styles';

import Cards from './Cards';

const getCardCount = flow(compact, size);
const getDisplayCards = flow(
  compact,
  chunk(6),
  unzip,
  map(compact),
  map(() => ({ flipped: true })),
);

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),
  (_, props) => props.player,
  (state, props) => get(getHands(state), props.player),

  (state, attackers, player, cards) => ({
    isMainAttacker: attackers[0] === player,
    isSideAttacker: attackers.slice(1).includes(player),
    isDefender: getDefender(state) === player,
    isUser: state.user && state.user === player,
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
  }),
);

const Wrapper = styled.div`
  margin: 10px;
  padding: 10px;
`;

const WideScreenOnly = styled.span({
  [MediaQuery.NARROW]: {
    display: 'none',
  },
});

const UICardWrapper = styled(UICard)(({ isGlowing }) => {
  const glow = keyframes({
    '0%': {
      boxShadow: '0 0 20px teal',
    },
    '100%': {
      boxShadow: '0 0 10px teal',
    },
  });

  return {
    '&&&': {
      animation: isGlowing ? `${glow} 1s ease alternate infinite` : null,
      marginTop: '-25px',
      paddingTop: '15px',
      zIndex: -1,
    },
  };
});

const CardsWrapper = styled.div({
  transformOrigin: 'top center',
  height: '10vh',
});

const LabelWrapper = styled(Label)({
  '&&&': {
    margin: '0 auto',
  },
});

const dagger = String.fromCodePoint(0x1f5e1);
const shield = String.fromCodePoint(0x1f6e1);
const bowAndArrow = String.fromCodePoint(0x1f3f9);

const Player = ({ player }) => {
  const {
    cardCount,
    displayCards,
    isMainAttacker,
    isSideAttacker,
    isDefender,
    isUser,
  } = useSelector(state => mapStateToProps(state, { player }), isEqual);

  const getContext = () => {
    if (isMainAttacker) return { text: 'The attacker', symbol: dagger };
    if (isDefender) return { text: 'The defender', symbol: shield };
    if (isSideAttacker) return { text: 'Attacking', symbol: bowAndArrow };

    return null;
  };

  const renderContext = () => {
    const context = getContext();
    if (!context) return null;

    const { text, symbol } = context;
    return (
      <div>
        <WideScreenOnly>{text}</WideScreenOnly>
      </div>
    );
  };

  if (!player) return <Wrapper />;

  return (
    <Wrapper>
      <LabelWrapper basic circular size="massive">
        {bowAndArrow}
      </LabelWrapper>
      <UICardWrapper isGlowing={isUser}>
        <UICard.Content>
          <UICard.Header>{`${player}`}</UICard.Header>
          {getContext() && <UICard.Meta>{renderContext()}</UICard.Meta>}
        </UICard.Content>
        <UICard.Content extra>
          <div>{`${cardCount} cards`}</div>
          <WideScreenOnly>
            <CardsWrapper>
              <Cards cards={displayCards} scale={0.4} />
            </CardsWrapper>
          </WideScreenOnly>
        </UICard.Content>
      </UICardWrapper>
    </Wrapper>
  );
};

export default Player;

Player.propTypes = {
  player: PropTypes.string,
};

Player.defaultProps = {
  player: null,
};
