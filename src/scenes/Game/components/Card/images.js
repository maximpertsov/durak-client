import get from 'lodash/get';

import clubsAce from './assets/001.png';
import clubs2 from './assets/002.png';
import clubs3 from './assets/003.png';
import clubs4 from './assets/004.png';
import clubs5 from './assets/005.png';
import clubs6 from './assets/006.png';
import clubs7 from './assets/007.png';
import clubs8 from './assets/008.png';
import clubs9 from './assets/009.png';
import clubs10 from './assets/010.png';
import clubsJack from './assets/011.png';
import clubsQueen from './assets/012.png';
import clubsKing from './assets/013.png';
import diamondsAce from './assets/014.png';
import diamonds2 from './assets/015.png';
import diamonds3 from './assets/016.png';
import diamonds4 from './assets/017.png';
import diamonds5 from './assets/018.png';
import diamonds6 from './assets/019.png';
import diamonds7 from './assets/020.png';
import diamonds8 from './assets/021.png';
import diamonds9 from './assets/022.png';
import diamonds10 from './assets/023.png';
import diamondsJack from './assets/024.png';
import diamondsQueen from './assets/025.png';
import diamondsKing from './assets/026.png';
import heartsAce from './assets/027.png';
import hearts2 from './assets/028.png';
import hearts3 from './assets/029.png';
import hearts4 from './assets/030.png';
import hearts5 from './assets/031.png';
import hearts6 from './assets/032.png';
import hearts7 from './assets/033.png';
import hearts8 from './assets/034.png';
import hearts9 from './assets/035.png';
import hearts10 from './assets/036.png';
import heartsJack from './assets/037.png';
import heartsQueen from './assets/038.png';
import heartsKing from './assets/039.png';
import spadesAce from './assets/040.png';
import spades2 from './assets/041.png';
import spades3 from './assets/042.png';
import spades4 from './assets/043.png';
import spades5 from './assets/044.png';
import spades6 from './assets/045.png';
import spades7 from './assets/046.png';
import spades8 from './assets/047.png';
import spades9 from './assets/048.png';
import spades10 from './assets/049.png';
import spadesJack from './assets/050.png';
import spadesQueen from './assets/051.png';
import spadesKing from './assets/052.png';

const cardsBySuitRank = {
  clubs: {
    ace: clubsAce,
    2: clubs2,
    3: clubs3,
    4: clubs4,
    5: clubs5,
    6: clubs6,
    7: clubs7,
    8: clubs8,
    9: clubs9,
    10: clubs10,
    jack: clubsJack,
    queen: clubsQueen,
    king: clubsKing,
  },
  diamonds: {
    ace: diamondsAce,
    2: diamonds2,
    3: diamonds3,
    4: diamonds4,
    5: diamonds5,
    6: diamonds6,
    7: diamonds7,
    8: diamonds8,
    9: diamonds9,
    10: diamonds10,
    jack: diamondsJack,
    queen: diamondsQueen,
    king: diamondsKing,
  },
  hearts: {
    ace: heartsAce,
    2: hearts2,
    3: hearts3,
    4: hearts4,
    5: hearts5,
    6: hearts6,
    7: hearts7,
    8: hearts8,
    9: hearts9,
    10: hearts10,
    jack: heartsJack,
    queen: heartsQueen,
    king: heartsKing,
  },
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
