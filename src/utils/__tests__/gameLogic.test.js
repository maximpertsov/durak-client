import { canDefend } from '../gameLogic';

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
/* eslint-enable max-len */
