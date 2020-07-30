import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
  },
  GAME: {
    ATTACKER: {
      SET: undefined,
    },
    HAND: {
      APPEND: undefined,
      REMOVE: undefined,
    },
    TABLE: {
      APPEND: undefined,
      STACK: undefined,
    },
    USERNAME: {
      SET: undefined,
    },
  },
});
