import { getDefender } from '..';

const players = ['anna', 'vasyl', 'igor', 'grusha'];

describe('getDefender', () => {
  test.each`
    attacker    | expected
    ${'anna'}   | ${'vasyl'}
    ${'vasyl'}  | ${'igor'}
    ${'igor'}   | ${'grusha'}
    ${'grusha'} | ${'anna'}
  `('$attacker attacks', ({ attacker, expected }) => {
  const state = { players, attacker };
  expect(getDefender(state)).toEqual(expected);
});
});
