import get from 'lodash/get';

import spadesAce from './assets/001.png';
import spades2 from './assets/002.png';
import spades3 from './assets/003.png';
import spades4 from './assets/004.png';
import spades5 from './assets/005.png';
import spades6 from './assets/006.png';
import spades7 from './assets/007.png';
import spades8 from './assets/008.png';
import spades9 from './assets/009.png';
import spades10 from './assets/010.png';
import spadesJack from './assets/011.png';
import spadesQueen from './assets/012.png';
import spadesKing from './assets/013.png';

const cardsBySuitRank = {
  spades: {
    ace: spadesAce,
    2: spades2,
    3: spades3,
    4: spades4,
    5: spades5,
    6: spades6,
    7: spades7,
    8: spades8,
    9: spades9,
    10: spades10,
    jack: spadesJack,
    queen: spadesQueen,
    king: spadesKing,
  },
};

const getCardImage = ({ rank, suit }) => get(cardsBySuitRank, [suit, rank]);

export default getCardImage;
