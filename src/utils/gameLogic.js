import every from 'lodash/every';
import flatMap from 'lodash/flatMap';
import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import some from 'lodash/some';

export const suits = Object.freeze(['clubs', 'diamonds', 'hearts', 'spades']);
export const ranks = Object.freeze([
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  'jack',
  'queen',
  'king',
  'ace',
]);
export const cards = Object.freeze(
  flatMap(suits, suit => ranks.map(rank => ({ rank, suit }))),
);

const rankValues = Object.freeze(
  fromPairs(ranks.map((value, index) => [value, index])),
);
const getValue = ({ rank }) => get(rankValues, rank);
const sameSuit = (card1, card2) => card1.suit === card2.suit;

export const canDefend = ({ attackCard, defenseCard, trumpSuit }) => {
  if (sameSuit(attackCard, defenseCard)) {
    return getValue(defenseCard) > getValue(attackCard);
  }
  return defenseCard.suit === trumpSuit;
};

export const canAttack = ({ table, card }) => {
  const flatTable = flatten(table);
  if (isEmpty(flatTable)) return true;

  return some(flatTable, ['rank', card.rank]);
};

export const canPass = ({ table, card }) => {
  if (isEmpty(table)) return false;
  if (some(table, stack => size(stack) !== 1)) return false;

  return every(table, ([_card]) => _card.rank === card.rank);
};

export default {};
