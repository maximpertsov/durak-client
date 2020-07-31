import { getAttackers, getDefender, getPlayersFromUser } from '..';

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

describe('getAttackers', () => {
  describe('table is empty', () => {
    const table = [];

    test.each`
      attacker    | expected
      ${'anna'}   | ${['anna']}
      ${'vasyl'}  | ${['vasyl']}
      ${'igor'}   | ${['igor']}
      ${'grusha'} | ${['grusha']}
    `('$attacker attacks', ({ attacker, expected }) => {
  const state = { table, attacker, players };
  expect(getAttackers(state).sort()).toEqual(expected.sort());
});
  });
  describe('table has cards', () => {
    const table = ['card'];

    test.each`
      attacker    | expected
      ${'anna'}   | ${['anna', 'igor', 'grusha']}
      ${'vasyl'}  | ${['vasyl', 'grusha', 'anna']}
      ${'igor'}   | ${['igor', 'anna', 'vasyl']}
      ${'grusha'} | ${['grusha', 'vasyl', 'igor']}
    `('$attacker attacks', ({ attacker, expected }) => {
  const state = { table, attacker, players };
  expect(getAttackers(state).sort()).toEqual(expected.sort());
});
  });
});
