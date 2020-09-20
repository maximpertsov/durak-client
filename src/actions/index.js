import { createActions } from 'redux-actions';

export default createActions({
  MESSAGES: {
    APPEND: undefined,
    CLEAR: undefined,
  },
  GAME: {
    REMOTE_DATA_STATE: {
      SET: undefined,
    },
    SELECTED_CARDS: {
      ADD: undefined,
      CLEAR: undefined,
      REMOVE: undefined,
      SET: undefined,
    },
    USER: {
      SET: undefined,
    },
  },
  HOME: {
    GAME_LIST: {
      SET: undefined,
    },
    GAME_REQUESTS: {
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
