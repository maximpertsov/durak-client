import { canAttack, canDefend } from '../gameLogic';

/* eslint-disable max-len */
describe('canDefend', () => {
  test.each`
    attackSuit  | attackRank | defenseSuit | defenseRank | trumpSuit   | expected
    ${'hearts'} | ${6}       | ${'hearts'} | ${7}        | ${'spades'} | ${true}
    ${'hearts'} | ${7}       | ${'hearts'} | ${6}        | ${'spades'} | ${false}
    ${'hearts'} | ${6}       | ${'clubs'}  | ${7}        | ${'spades'} | ${false}
    ${'hearts'} | ${'ace'}   | ${'spades'} | ${7}        | ${'spades'} | ${true}
  `(
  '$defenseRank of $defenseSuit beats $attackRank of $attackSuit when $trump is trump? $expected',
  ({
    attackSuit,
    attackRank,
    defenseSuit,
    defenseRank,
    trumpSuit,
    expected,
  }) => {
    const defenseCard = { suit: defenseSuit, rank: defenseRank };
    const attackCard = { suit: attackSuit, rank: attackRank };
    expect(canDefend({ defenseCard, attackCard, trumpSuit })).toBe(expected);
  },
);
});

describe('canAttack', () => {
  describe('empty table', () => {
    const table = [];
    const card = { suit: 'spades', rank: 'ace' };

    test('always true', () => {
      expect(canAttack({ table, card })).toBe(true);
    });
  });

  describe('table with cards', () => {
    const table = [
      [
        { suit: 'hearts', rank: 10 },
        { suit: 'hearts', rank: 'ace' },
      ],
      [{ suit: 'clubs', rank: 7 }],
    ];

    test.each`
      suit          | rank     | expected
      ${'spades'}   | ${7}     | ${true}
      ${'spades'}   | ${8}     | ${false}
      ${'spades'}   | ${'ace'} | ${true}
      ${'spades'}   | ${10}    | ${true}
      ${'diamonds'} | ${10}    | ${true}
    `('with $suit of $rank? $expected', ({ rank, suit, expected }) => {
  expect(canAttack({ table, card: { rank, suit } })).toBe(expected);
});
  });
});
/* eslint-enable max-len */
