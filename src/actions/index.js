import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
  },
  GAME: {
    REMOTE_DATA_STATE: {
      SET: undefined,
    },
    PASS_COUNT: {
      SET: undefined,
    },
    SELECTED_CARDS: {
      ADD: undefined,
      CLEAR: undefined,
      REMOVE: undefined,
      SET: undefined,
    },
    TABLE: {
      APPEND: undefined,
      CLEAR: undefined,
      SET: undefined,
      STACK: undefined,
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
  HOME: {
    GAME_LIST: {
      SET: undefined,
    },
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
