import every from 'lodash/every';
import flatMap from 'lodash/flatMap';
import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import size from 'lodash/size';
import some from 'lodash/some';

export const suits = Object.freeze(['clubs', 'diamonds', 'hearts', 'spades']);
export const ranks = Object.freeze([
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace',
]);

export const cardsWithData = Object.freeze(
  fromPairs(
    flatMap(suits, suit =>
      ranks.map((rank, index) => {
        const shortRank = rank === '10' ? rank : rank.charAt(0);
        const shortSuit = suit.charAt(0);
        const key = `${shortRank}${shortSuit}`.toUpperCase();

        return [key, { suit, rank, value: index }];
      }),
    ),
  ),
);

export const cards = keys(cardsWithData);

export const getRank = card => get(cardsWithData, [card, 'rank']);
export const getSuit = card => get(cardsWithData, [card, 'suit']);

const getValue = card => get(cardsWithData, [card, 'value']);
const sameSuit = (card1, card2) => getSuit(card1) === getSuit(card2);

export const canDefend = ({ attackCard, defenseCard, trumpSuit }) => {
  if (sameSuit(attackCard, defenseCard)) {
    return getValue(defenseCard) > getValue(attackCard);
  }
  return getSuit(defenseCard) === trumpSuit;
};

export const canAttack = ({ table, card }) => {
  const flatTable = flatten(table);
  if (isEmpty(flatTable)) return true;

  return some(flatTable, tableCard => getRank(tableCard) === getRank(card));
};

export const canPass = ({ table, card }) => {
  if (isEmpty(table)) return false;
  if (some(table, stack => size(stack) !== 1)) return false;

  return every(table, ([_card]) => _card.rank === card.rank);
};

export default {};
