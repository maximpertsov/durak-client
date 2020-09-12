import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import styled from '@emotion/styled';
import { Card as UICard } from 'semantic-ui-react';

import chunk from 'lodash/fp/chunk';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import size from 'lodash/fp/size';
import unzip from 'lodash/fp/unzip';

import get from 'lodash/get';

import { getHands } from 'reducers';
import { MediaQuery } from 'styles';

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
  (state, props) => get(getHands(state), props.player),

  cards => ({
    cardCount: getCardCount(cards),
    displayCards: getDisplayCards(cards),
  }),
);

const WideScreenOnly = styled.span({
  [MediaQuery.NARROW]: {
    display: 'none',
  },
});

const CardsWrapper = styled.div({
  transformOrigin: 'top center',
  height: '10vh',
});

const PlayerContext = ({ player }) => {
  const { cardCount, displayCards } = useSelector(
    state => mapStateToProps(state, { player }),
    isEqual,
  );

  return (
    <UICard.Content extra>
      <div>{`${cardCount} cards`}</div>
      <WideScreenOnly>
        <CardsWrapper>
          <Cards cards={displayCards} scale={0.4} />
        </CardsWrapper>
      </WideScreenOnly>
    </UICard.Content>
  );
};

export default PlayerContext;

PlayerContext.propTypes = {
  player: PropTypes.string,
};

PlayerContext.defaultProps = {
  player: null,
};
