import { getRank, getSuit } from '../gameLogic';

describe('getRank and getSuit', () => {
  test.each`
    card     | suit          | rank
    ${'6H'}  | ${'hearts'}   | ${'6'}
    ${'7H'}  | ${'hearts'}   | ${'7'}
    ${'AH'}  | ${'hearts'}   | ${'ace'}
    ${'7C'}  | ${'clubs'}    | ${'7'}
    ${'10S'} | ${'spades'}   | ${'10'}
    ${'QD'}  | ${'diamonds'} | ${'queen'}
  `('$card is a $rank of $suit', ({ card, suit, rank }) => {
  expect(getRank(card)).toEqual(rank);
  expect(getSuit(card)).toEqual(suit);
});
});
