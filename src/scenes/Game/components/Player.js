import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Card as UICard, Header, Label } from 'semantic-ui-react';

import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import size from 'lodash/fp/size';
import unzip from 'lodash/fp/unzip';

import findIndex from 'lodash/findIndex';
import get from 'lodash/get';

import {
  getAttackers,
  getAttackLimit,
  getCollector,
  getDefender,
  getDurak,
  getHands,
  getJoined,
  getOutOfPlay,
  getPlayers,
  getWinners,
  getYielded,
} from 'reducers';
import { Emoji, MediaQuery } from 'styles';

import Cards from './Cards';

const getCardCount = flow(compact, size);
const getDisplayCards = flow(
  compact,
  chunk(3),
  unzip,
  map(compact),
  map(stack => stack.map(() => ({ flipped: true }))),
);

const mapStateToProps = createSelector(
  state => state,
  state => getAttackers(state),
  state => getPlayers(state),
  state => getJoined(state),
  state => getCollector(state),
  (_, props) => props.player,
  (state, props) => get(getHands(state), props.player),

  (state, attackers, players, joined, collector, player, cards) => ({
    attackLimit: getAttackLimit(state),
    hasJoined: joined && joined.includes(player),
    hasYielded: getYielded(state).includes(player),
    isCollecting: collector && collector === player,
    isDefender: getDefender(state) === player,
    isDurak: getDurak(state) === player,
    isNextDefender: players.slice(2, 3).includes(player),
    isFollowingNextDefender: players.slice(3, 4).includes(player),
    isOutOfPlay: getOutOfPlay(state).includes(player),
    isMainAttacker: attackers[0] === player,
    isSideAttacker: attackers.slice(1).includes(player),
    isUser: state.user && state.user === player,
    isWinner: getWinners(state).includes(player),
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
    order: findIndex(players, isEqual(player)) + 1,
  }),
);

// eslint-disable-next-line complexity
const Wrapper = styled.div(({ isNextDefender, isFollowingNextDefender }) => ({
  [MediaQuery.WIDE]: {
    margin: '0px',
    padding: '0px',
  },
  [MediaQuery.WIDE]: {
    margin: '10px',
    padding: '10px',
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

const UICardWrapper = styled(UICard)(({ faded, glowing }) => {
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
      animation: glowing ? `${glow} 1s ease alternate infinite` : null,
      opacity: faded ? 0.3 : 1,
      marginTop: '-25px',
      zIndex: -1,
    },
  };
});

const CardsWrapper = styled.div({
  transformOrigin: 'top center',
  height: '10vh',
});

const OrderLabelWrapper = styled(Label)({
  [MediaQuery.NARROW]: {
    '&&&': {
      display: 'none',
    },
  },
});

const StatusIconLabelWrapper = styled(Label)({
  '&&&': {
    margin: '0 auto',
  },
});

const Player = ({ player }) => {
  const {
    attackLimit,
    cardCount,
    displayCards,
    hasJoined,
    hasYielded,
    isCollecting,
    isDefender,
    isDurak,
    isNextDefender,
    isFollowingNextDefender,
    isOutOfPlay,
    isMainAttacker,
    isSideAttacker,
    isUser,
    isWinner,
    order,
  } = useSelector(state => mapStateToProps(state, { player }), isEqual);

  // eslint-disable-next-line complexity
  const getContext = () => {
    if (isDurak) return { text: 'The durak!', symbol: Emoji.UPSET };
    if (isWinner) return { text: 'A winner!', symbol: Emoji.SUNGLASSES };
    if (hasYielded) return { text: 'Stopped attacking', symbol: Emoji.THUMBS_UP };
    if (isCollecting) return { text: 'Collecting', symbol: Emoji.WHITE_FLAG };
    if (isMainAttacker) return { text: 'The attacker', symbol: Emoji.DAGGER };
    if (isDefender) return { text: 'The defender', symbol: Emoji.SHIELD };
    if (isSideAttacker) return { text: 'Attacking', symbol: Emoji.BOW_AND_ARROW };
    if (hasJoined) return { text: 'Joined game', symbol: Emoji.ROCKET };

    return { text: '...' };
  };

  const renderStatusIcon = () => {
    const statusIcon = get(getContext(), 'symbol', null);

    return (
      <StatusIconLabelWrapper basic circular size="massive">
        {statusIcon}
      </StatusIconLabelWrapper>
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
    <UICardWrapper faded={isOutOfPlay} fluid glowing={isUser}>
      <UICard.Content>
        <OrderLabelWrapper attached="top left" size="small">
          {order}
        </OrderLabelWrapper>
        <Header size="small">{`${player}`}</Header>
        {getContext() && <UICard.Meta>{renderContext()}</UICard.Meta>}
      </UICard.Content>
      {attackLimit !== 'unlimited' && (
        <UICard.Content extra>
          <div>{`${cardCount} cards`}</div>
          <WideScreenOnly>
            <CardsWrapper>
              <Cards cards={displayCards} scale={0.4} />
            </CardsWrapper>
          </WideScreenOnly>
        </UICard.Content>
      )}
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
