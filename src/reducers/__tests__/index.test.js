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
  test('defender is vasyl', () => {
    const state = { players };
    const expected = 'vasyl';
    expect(getDefender(state)).toEqual(expected);
  });
});

describe('getPlayersFromUser', () => {
  test.each`
    user        | expected
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

    test('attacker is anna', () => {
      const state = { table, players };
      const expected = ['anna'];
      expect(getAttackers(state).sort()).toEqual(expected.sort());
    });
  });
  describe('table has cards', () => {
    const table = ['card'];

    test('all except vasyl attack', () => {
      const state = { table, players };
      const expected = ['anna', 'igor', 'grusha'];
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
