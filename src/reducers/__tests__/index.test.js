import sortBy from 'lodash/sortBy';

import {
  getAttackers,
  getDefender,
  getPlayersFromUser,
  getUnbeatenCards,
} from '..';

const players = ['anna', 'vasyl', 'igor', 'grusha'];
const sortCards = cards => sortBy(cards, ['suit', 'rank']);

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
    user    | expected
    ${'anna'}   | ${['anna', 'vasyl', 'igor', 'grusha']}
    ${'vasyl'}  | ${['vasyl', 'igor', 'grusha', 'anna']}
    ${'igor'}   | ${['igor', 'grusha', 'anna', 'vasyl']}
    ${'grusha'} | ${['grusha', 'anna', 'vasyl', 'igor']}
  `('$user attacks', ({ user, expected }) => {
  const state = { players, user };
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
  expect(sortBy(getAttackers(state))).toEqual(sortBy(expected));
});
  });
});

describe('getUnbeatenCards', () => {
  const state = {
    table: [
      [
        { suit: 'hearts', rank: 'jack' },
        { suit: 'hearts', rank: 'queen' },
      ],
      [{ suit: 'spades', rank: 'jack' }],
      [{ suit: 'clubs', rank: 7 }],
    ],
  };
  test('get all unbeaten cards', () => {
    const expected = [
      { suit: 'clubs', rank: 7 },
      { suit: 'spades', rank: 'jack' },
    ];
    expect(sortCards(getUnbeatenCards(state))).toEqual(sortCards(expected));
  });
});
