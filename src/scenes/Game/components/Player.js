import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Card as UICard } from 'semantic-ui-react';

import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import size from 'lodash/fp/size';
import unzip from 'lodash/fp/unzip';

import { getAttackers, getDefender } from 'reducers';

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
  (_, props) => props.player,
  (state, props) => state.hands[props.player],

  (state, player, cards) => ({
    isAttacker: getAttackers(state).includes(player),
    isDefender: getDefender(state) === player,
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
  }),
);

const Wrapper = styled.div(({ isDefender }) => {
  const glow = keyframes({
    '0%': {
      boxShadow: '0 0 20px teal',
    },
    '100%': {
      boxShadow: '0 0 10px teal',
    },
  });

  return {
    animation: isDefender ? `${glow} 1s ease alternate infinite` : null,
    margin: '10px',
  };
});

const WideScreenOnly = styled.div({
  '@media (max-width: 720px)': {
    display: 'none',
  },
});

const CardsWrapper = styled.div({
  transformOrigin: 'top center',
  height: '10vh',
});

const dagger = String.fromCodePoint(0x1f5e1);
const shield = String.fromCodePoint(0x1f6e1);

const Player = ({ player }) => {
  const { cardCount, displayCards, isAttacker, isDefender } = useSelector(
    state => mapStateToProps(state, { player }),
    isEqual,
  );

  const getContext = () => {
    if (isAttacker) return `The attacker ${dagger}`;
    if (isDefender) return `The defender ${shield}`;

    return null;
  };

  if (!player) return <Wrapper />;

  return (
    <Wrapper isDefender={isDefender}>
      <UICard fluid>
        <UICard.Content>
          <UICard.Header>{`${player}`}</UICard.Header>
          {getContext() && <UICard.Meta>{getContext()}</UICard.Meta>}
        </UICard.Content>
        <UICard.Content extra>
          <div>{`${cardCount} cards`}</div>
          <WideScreenOnly>
            <CardsWrapper>
              <Cards cards={displayCards} scale={0.4} />
            </CardsWrapper>
          </WideScreenOnly>
        </UICard.Content>
      </UICard>
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
