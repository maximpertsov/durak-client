import { getDefender, getPlayersFromUser } from '..';

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

describe('getPlayersFromUser', () => {
  test.each`
    username    | expected
    ${'anna'}   | ${['anna', 'vasyl', 'igor', 'grusha']}
    ${'vasyl'}  | ${['vasyl', 'igor', 'grusha', 'anna']}
    ${'igor'}   | ${['igor', 'grusha', 'anna', 'vasyl']}
    ${'grusha'} | ${['grusha', 'anna', 'vasyl', 'igor']}
  `('$username attacks', ({ username, expected }) => {
  const state = { players, username };
  expect(getPlayersFromUser(state)).toStrictEqual(expected);
});
});
