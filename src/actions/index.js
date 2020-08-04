import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
  },
  GAME: {
    DRAW_PILE: {
      SET: undefined,
    },
    HAND: {
      ADD: undefined,
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
    TABLE: {
      APPEND: undefined,
      STACK: undefined,
      CLEAR: undefined,
    },
    USER: {
      SET: undefined,
    },
  },
});
