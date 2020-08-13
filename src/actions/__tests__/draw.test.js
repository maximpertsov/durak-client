import actions from 'actions';
import draw from 'actions/draw';

const payload = {
  drawPile: [
    {
      suit: 'clubs',
      rank: '9',
    },
    {
      suit: 'spades',
      rank: '4',
    },
    {
      suit: 'hearts',
      rank: 'ace',
    },
    {
      suit: 'clubs',
      rank: '5',
    },
    {
      suit: 'diamonds',
      rank: 'ace',
    },
    {
      suit: 'hearts',
      rank: '6',
    },
    {
      suit: 'spades',
      rank: '3',
    },
    {
      suit: 'hearts',
      rank: 'king',
    },
    {
      suit: 'diamonds',
      rank: '3',
    },
    {
      suit: 'spades',
      rank: '5',
    },
    {
      suit: 'clubs',
      rank: 'ace',
    },
    {
      suit: 'spades',
      rank: '8',
    },
    {
      suit: 'diamonds',
      rank: '6',
    },
    {
      suit: 'clubs',
      rank: '6',
    },
    {
      suit: 'hearts',
      rank: '2',
    },
    {
      suit: 'spades',
      rank: 'ace',
    },
    {
      suit: 'hearts',
      rank: '10',
    },
    {
      suit: 'clubs',
      rank: '4',
    },
    {
      suit: 'spades',
      rank: 'queen',
    },
    {
      suit: 'clubs',
      rank: '8',
    },
    {
      suit: 'diamonds',
      rank: '10',
    },
    {
      suit: 'diamonds',
      rank: '9',
    },
    {
      suit: 'hearts',
      rank: '5',
    },
    {
      suit: 'clubs',
      rank: '2',
    },
    {
      suit: 'hearts',
      rank: 'queen',
    },
    {
      suit: 'hearts',
      rank: '8',
    },
    {
      suit: 'hearts',
      rank: '4',
    },
    {
      suit: 'spades',
      rank: 'jack',
    },
  ],
  game: 'abc123',
  hands: {
    anna: [
      {
        suit: 'hearts',
        rank: '7',
      },
      null,
      {
        suit: 'hearts',
        rank: '3',
      },
      null,
      {
        suit: 'spades',
        rank: '2',
      },
      {
        suit: 'diamonds',
        rank: '7',
      },
    ],
    vasyl: [
      {
        suit: 'hearts',
        rank: '9',
      },
      null,
      null,
      {
        suit: 'spades',
        rank: '10',
      },
      {
        suit: 'spades',
        rank: '9',
      },
      {
        suit: 'spades',
        rank: '7',
      },
    ],
    igor: [
      {
        suit: 'diamonds',
        rank: 'queen',
      },
      {
        suit: 'spades',
        rank: '6',
      },
      {
        suit: 'clubs',
        rank: '10',
      },
      {
        suit: 'diamonds',
        rank: '8',
      },
      {
        suit: 'diamonds',
        rank: 'king',
      },
      {
        suit: 'diamonds',
        rank: '5',
      },
    ],
    grusha: [
      {
        suit: 'clubs',
        rank: '3',
      },
      {
        suit: 'spades',
        rank: 'king',
      },
      {
        suit: 'clubs',
        rank: 'jack',
      },
      {
        suit: 'clubs',
        rank: 'queen',
      },
      {
        suit: 'clubs',
        rank: '7',
      },
      {
        suit: 'diamonds',
        rank: '2',
      },
    ],
  },
  players: ['anna', 'vasyl', 'igor', 'grusha'],
  rotations: 1,
};

describe('draw', () => {
  const store = mockStore({});

  test('anna and vasyl draw, and vasyl attacks', async () => {
    await store.dispatch(draw(payload));
    expect(store.getActions()).toEqual({});
  });
});
