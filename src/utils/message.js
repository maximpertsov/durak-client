import get from 'lodash/get';

import { Emoji } from 'styles';
import { getRank, getSuit } from 'utils/gameLogic';

const suitCodepoints = Object.freeze({
  spades: Emoji.SPADES,
  hearts: Emoji.HEARTS,
  diamonds: Emoji.DIAMONDS,
  clubs: Emoji.CLUBS,
});

const getSuitText = suit => get(suitCodepoints, suit, '');

const getCardText = card => {
  const rank = getRank(card);
  const suit = getSuit(card);

  return `${
    Number.isNaN(+rank) ? rank.charAt(0).toUpperCase() : rank
  }${getSuitText(suit)}`;
};

// eslint-disable-next-line complexity
export const getMessageText = ({ type, payload }) => {
  switch (type) {
    case 'attacked':
      return `attacked with ${getCardText(payload.card)}`;
    case 'attacked_with_many':
      return `attacked with ${payload.cards.map(getCardText).join(' ')}`;
    case 'defended':
      return `defended ${getCardText(payload.baseCard)} with ${getCardText(
        payload.card,
      )}`;
    case 'collected':
      return 'collected cards';
    case 'gave_up':
      return `gave up ${String.fromCodePoint(0x1f3f3)}`;
    case 'yielded_attack':
      return `stopped attacking ${String.fromCodePoint(0x1f44d)}`;
    case 'passed':
      return `passed with ${getCardText(payload.card)}`;
    case 'passed_with_many':
      return `passed with ${payload.cards.map(getCardText).join(' ')}`;
    case 'joined_game':
      return 'joined the game';
    case 'restarted':
      return 'started a new game';
    default:
      return type;
  }
};

export default {};
