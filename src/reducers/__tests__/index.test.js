import { getPlayersFromUser, getUnbeatenCards } from '..';

const players = ['anna', 'vasyl', 'igor', 'grusha'];

/* eslint-disable indent */
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
/* eslint-enable indent */

describe('getUnbeatenCards', () => {
  const state = {
    table: [['JH', 'QH'], ['JS'], ['7C']],
  };
  test('get all unbeaten cards', () => {
    const expected = ['7C', 'JS'];
    expect(getUnbeatenCards(state).sort()).toEqual(expected.sort());
  });
});
