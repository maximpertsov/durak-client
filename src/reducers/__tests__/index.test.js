import {
  getAttackers,
  getDefender,
  getPlayersFromUser,
  getUnbeatenCards,
} from '..';

const players = ['anna', 'vasyl', 'igor', 'grusha'];
const hands = {
  anna: ['AH'],
  vasyl: ['JD'],
  igor: ['KS'],
  grusha: ['QH'],
};

describe('getDefender', () => {
  test('vasyl has cards', () => {
    const state = { players, hands };
    const expected = 'vasyl';
    expect(getDefender(state)).toEqual(expected);
  });
  test('vasyl has no cards', () => {
    const state = { players, hands: { ...hands, vasyl: [] } };
    const expected = 'igor';
    expect(getDefender(state)).toEqual(expected);
  });
  test('anna has no cards but is attacking', () => {
    const state = { players, hands: { ...hands, anna: [null] } };
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
    ${null}     | ${[]}
  `('$user attacks', ({ user, expected }) => {
  const state = { players, user };
  expect(getPlayersFromUser(state)).toStrictEqual(expected);
});
});

describe('getAttackers', () => {
  describe('table is empty', () => {
    const table = [];

    test('attacker is anna', () => {
      const state = { table, players, hands };
      const expected = ['anna'];
      expect(getAttackers(state).sort()).toEqual(expected.sort());
    });
  });
  describe('table has cards', () => {
    const table = ['6S'];

    test('all except vasyl attack', () => {
      const state = { table, players, hands };
      const expected = ['anna', 'igor', 'grusha'];
      expect(getAttackers(state).sort()).toEqual(expected.sort());
    });
  });
  describe('vasyl has no cards', () => {
    const table = ['6S'];

    test('anna and grusha attack', () => {
      const state = { table, players, hands: { ...hands, vasyl: [] } };
      const expected = ['anna', 'grusha'];
      expect(getAttackers(state).sort()).toEqual(expected.sort());
    });
  });
  describe('anna has no cards but is attacking', () => {
    const table = ['6S'];

    test('all except vasyl attack', () => {
      const state = { table, players, hands: { ...hands, anna: [null] } };
      const expected = ['anna', 'igor', 'grusha'];
      expect(getAttackers(state).sort()).toEqual(expected.sort());
    });
  });
});

describe('getUnbeatenCards', () => {
  const state = {
    table: [['JH', 'QH'], ['JS'], ['7C']],
  };
  test('get all unbeaten cards', () => {
    const expected = ['7C', 'JS'];
    expect(getUnbeatenCards(state).sort()).toEqual(expected.sort());
  });
});
