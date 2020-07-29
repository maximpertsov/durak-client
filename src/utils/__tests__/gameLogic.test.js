import { canDefend } from '../gameLogic';

/* eslint-disable max-len */
describe('canDefend', () => {
  test.each`
    attackSuit  | attackRank | defenseSuit | defenseRank | trump       | expected
    ${'hearts'} | ${2}       | ${'hearts'} | ${3}        | ${'spades'} | ${true}
  `(
  '$defenseRank of $defenseSuit beats $attackRank of $attackSuit when $trump is trump? $expected',
  ({ attackSuit, attackRank, defenseSuit, defenseRank, trump, expected }) => {
    const defenseCard = { suit: defenseSuit, rank: defenseRank };
    const attackCard = { suit: attackSuit, rank: attackRank };
    expect(canDefend({ defenseCard, attackCard, trump })).toBe(expected);
  },
);
});
/* eslint-enable max-len */
