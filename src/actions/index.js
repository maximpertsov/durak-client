import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
  },
  GAME: {
    ATTACKER: {
      SET: undefined,
    },
    DRAW_PILE: {
      SET: undefined,
    },
    HAND: {
      REMOVE: undefined,
    },
    PLAYERS: {
      ADD: undefined,
      SET: undefined,
    },
    YIELDED: {
      ADD: undefined,
      CLEAR: undefined,
    },
    TABLE: {
      APPEND: undefined,
      STACK: undefined,
    },
    USER: {
      SET: undefined,
    },
  },
});
