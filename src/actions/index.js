import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
    SEND_IN_PROGRESS: {
      SET: undefined,
    },
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
    HANDS: {
      ADD: undefined,
      COMPACT: undefined,
      REMOVE: undefined,
      SET: undefined,
    },
    PLAYERS: {
      ADD: undefined,
      SET: undefined,
      ROTATE: undefined,
    },
    TABLE: {
      APPEND: undefined,
      CLEAR: undefined,
      SET: undefined,
      STACK: undefined,
    },
    TRUMP_SUIT: {
      SET: undefined,
    },
    USER: {
      SET: undefined,
    },
    YIELDED: {
      ADD: undefined,
      CLEAR: undefined,
      SET: undefined,
    },
  },
});
