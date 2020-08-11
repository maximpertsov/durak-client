import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
  },
  GAME: {
    ID: {
      SET: undefined,
    },
    REMOTE_DATA_STATE: {
      SET: undefined,
    },
    DRAW_PILE: {
      SET: undefined,
    },
    HAND: {
      ADD: undefined,
      COMPACT: undefined,
      REMOVE: undefined,
    },
    PLAYERS: {
      ADD: undefined,
      SET: undefined,
      ROTATE: undefined,
    },
    YIELDED: {
      ADD: undefined,
      CLEAR: undefined,
    },
    ROTATIONS: {
      SET: {
        ZERO: () => 0,
        ONE: () => 1,
        TWO: () => 2,
      },
    },
    TABLE: {
      APPEND: undefined,
      STACK: undefined,
      CLEAR: undefined,
    },
    TRUMP_SUIT: {
      SET: undefined,
    },
    USER: {
      SET: undefined,
    },
  },
  HOME: {
    LOGIN_FORM: {
      USERNAME: {
        SET: undefined,
      },
      PASSWORD: {
        SET: undefined,
      },
      ERROR: {
        SET: undefined,
      },
    },
  },
});
