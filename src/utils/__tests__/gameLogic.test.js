import {
  canAttack,
  canDefend,
  canPass,
  cards,
  getRank,
  getSuit,
} from '../gameLogic';

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

describe('canDefend', () => {
  test.each`
    attackCard | defenseCard | trumpSuit   | expected
    ${'6H'}    | ${'7H'}     | ${'spades'} | ${true}
    ${'7H'}    | ${'6H'}     | ${'spades'} | ${false}
    ${'6H'}    | ${'7C'}     | ${'spades'} | ${false}
    ${'AH'}    | ${'7S'}     | ${'spades'} | ${true}
  `(
  '$defenseCard beats $attackCard when $trump is trump? $expected',
  ({ attackCard, defenseCard, trumpSuit, expected }) => {
    expect(canDefend({ defenseCard, attackCard, trumpSuit })).toBe(expected);
  },
);
});

describe('canAttack', () => {
  describe('empty table', () => {
    const table = [];

    test('always true', () => {
      cards.forEach(card => {
        expect(canAttack({ table, card })).toBe(true);
      });
    });
  });

  describe('table with cards', () => {
    const table = [['10H', 'AH'], ['7C']];

    test.each`
      card     | expected
      ${'7S'}  | ${true}
      ${'8S'}  | ${false}
      ${'AS'}  | ${true}
      ${'10S'} | ${true}
      ${'10D'} | ${true}
    `('with $card? $expected', ({ card, expected }) => {
  expect(canAttack({ table, card })).toBe(expected);
});
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
    const table = [
      [
        { suit: 'hearts', rank: 10 },
        { suit: 'spades', rank: 10 },
      ],
    ];

    test('always false', () => {
      cards.forEach(card => {
        expect(canPass({ table, card })).toBe(false);
      });
    });
  });

  describe('table with non-uniform ranks', () => {
    const table = [
      [
        { suit: 'hearts', rank: 9 },
        { suit: 'spades', rank: 10 },
      ],
    ];

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
