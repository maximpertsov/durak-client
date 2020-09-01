import { canAttack, canPass, cards, getRank, getSuit } from '../gameLogic';

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

describe('canPass', () => {
  describe('empty table', () => {
    const table = [];

    test('always false', () => {
      cards.forEach(card => {
        expect(canPass({ table, card })).toBe(false);
      });
    });
  });

  describe('table with beaten cards', () => {
    const table = [['10H', '10S']];

    test('always false', () => {
      cards.forEach(card => {
        expect(canPass({ table, card })).toBe(false);
      });
    });
  });

  describe('table with non-uniform ranks', () => {
    const table = [['9H'], ['10S']];

    test('always false', () => {
      cards.forEach(card => {
        expect(canPass({ table, card })).toBe(false);
      });
    });
  });

  describe('table with uniform ranks', () => {
    const table = [['10H'], ['10C']];

    test.each`
      card     | expected
      ${'7S'}  | ${false}
      ${'8S'}  | ${false}
      ${'AS'}  | ${false}
      ${'10S'} | ${true}
      ${'10D'} | ${true}
    `('with $card? $expected', ({ card, expected }) => {
  expect(canPass({ table, card })).toBe(expected);
});
  });
});
