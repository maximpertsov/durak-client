import { getPlayersFromUser, getTable, getUnbeatenCards } from '..';

const players = ['anna', 'vasyl', 'igor', 'grusha'];

/* eslint-disable indent */
describe('getPlayersFromUser', () => {
  // TODO: player arrays must contain objects now!
  test.each`
    user        | expected
    ${'anna'}   | ${['anna', 'vasyl', 'igor', 'grusha']}
    ${'vasyl'}  | ${['vasyl', 'igor', 'grusha', 'anna']}
    ${'igor'}   | ${['igor', 'grusha', 'anna', 'vasyl']}
    ${'grusha'} | ${['grusha', 'anna', 'vasyl', 'igor']}
    ${null}     | ${[]}
  `('$user attacks', ({ user, expected }) => {
    const playerData = players.map((player, index) => ({
      id: player,
      order: index,
    }));
    const state = { messages: [{ toState: { players: playerData } }], user };
    expect(getPlayersFromUser(state)).toStrictEqual(expected);
  });
});
/* eslint-enable indent */

describe('table', () => {
  const playersWithTableData = [
    {
      attacks: [
        { attack: 'JH', defense: 'QH', timestamp: 0 },
        { attack: '7C', defense: null, timestamp: 2 },
      ],
    },
    { attacks: [{ attack: 'JS', defense: null, timestamp: 1 }] },
  ];
  const state = {
    messages: [{ toState: { players: playersWithTableData } }],
  };

  test('get table', () => {
    const expected = [['JH', 'QH'], ['JS'], ['7C']];
    expect(getTable(state)).toStrictEqual(expected);
  });

  test('get all unbeaten cards', () => {
    const expected = ['7C', 'JS'];
    expect(getUnbeatenCards(state).sort()).toStrictEqual(expected.sort());
  });
});
