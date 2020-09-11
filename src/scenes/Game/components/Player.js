import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Card as UICard, Label } from 'semantic-ui-react';

import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import size from 'lodash/fp/size';
import unzip from 'lodash/fp/unzip';

import get from 'lodash/get';

import { getAttackers, getDefender, getHands, getPlayers } from 'reducers';
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
  state => getPlayers(state),
  (_, props) => props.player,
  (state, props) => get(getHands(state), props.player),

  (state, attackers, players, player, cards) => ({
    isDefender: getDefender(state) === player,
    isNextDefender: players.slice(2, 3).includes(player),
    isFollowingNextDefender: players.slice(3, 4).includes(player),
    isMainAttacker: attackers[0] === player,
    isSideAttacker: attackers.slice(1).includes(player),
    isUser: state.user && state.user === player,
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
  }),
);

// eslint-disable-next-line complexity
const Wrapper = styled.div(({ isNextDefender, isFollowingNextDefender }) => ({
  margin: '10px',
  padding: '10px',
  [MediaQuery.WIDE]: {
    ...(isNextDefender || isFollowingNextDefender ? { gridRow: '2/2' } : {}),
    ...(isNextDefender && !isFollowingNextDefender
      ? { gridColumn: '2 / 2' }
      : {}),
    ...(isFollowingNextDefender ? { gridColumn: '1 / 1' } : {}),
  },
}));

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
    isDefender,
    isNextDefender,
    isFollowingNextDefender,
    isMainAttacker,
    isSideAttacker,
    isUser,
  } = useSelector(state => mapStateToProps(state, { player }), isEqual);

  const getContext = () => {
    if (isMainAttacker) return { text: 'The attacker', symbol: dagger };
    if (isDefender) return { text: 'The defender', symbol: shield };
    if (isSideAttacker) return { text: 'Attacking', symbol: bowAndArrow };

    return null;
  };

  const renderStatusIcon = () => {
    const statusIcon = get(getContext(), 'symbol', null);

    return (
      <LabelWrapper basic circular size="massive">
        {statusIcon}
      </LabelWrapper>
    );
  };
  const renderContext = () => {
    const context = getContext();
    if (!context) return null;

    const { text } = context;
    return (
      <div>
        <WideScreenOnly>{text}</WideScreenOnly>
      </div>
    );
  };

  const renderUICard = () => (
    <UICardWrapper fluid isGlowing={isUser}>
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
  );

  if (!player) return <Wrapper />;

  return (
    <Wrapper
      isNextDefender={isNextDefender}
      isFollowingNextDefender={isFollowingNextDefender}
    >
      {renderStatusIcon()}
      {renderUICard()}
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
