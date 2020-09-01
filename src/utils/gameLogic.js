import flatMap from 'lodash/flatMap';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import keys from 'lodash/keys';

const suits = Object.freeze(['clubs', 'diamonds', 'hearts', 'spades']);
const ranks = Object.freeze([
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
const cardsWithData = Object.freeze(
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

export default {};
