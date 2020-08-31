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
import backOfCard from './assets/055.png';

const cardsBySuitRank = {
  // clubs
  'AC': clubsAce,
  '2C': clubs2,
  '3C': clubs3,
  '4C': clubs4,
  '5C': clubs5,
  '6C': clubs6,
  '7C': clubs7,
  '8C': clubs8,
  '9C': clubs9,
  '10C': clubs10,
  'JC': clubsJack,
  'QC': clubsQueen,
  'KC': clubsKing,
  // diamonds
  'AD': diamondsAce,
  '2D': diamonds2,
  '3D': diamonds3,
  '4D': diamonds4,
  '5D': diamonds5,
  '6D': diamonds6,
  '7D': diamonds7,
  '8D': diamonds8,
  '9D': diamonds9,
  '10D': diamonds10,
  'JD': diamondsJack,
  'QD': diamondsQueen,
  'KD': diamondsKing,
  // hearts
  'AH': heartsAce,
  '2H': hearts2,
  '3H': hearts3,
  '4H': hearts4,
  '5H': hearts5,
  '6H': hearts6,
  '7H': hearts7,
  '8H': hearts8,
  '9H': hearts9,
  '10H': hearts10,
  'JH': heartsJack,
  'QH': heartsQueen,
  'KH': heartsKing,
  // spades
  'AS': spadesAce,
  '2S': spades2,
  '3S': spades3,
  '4S': spades4,
  '5S': spades5,
  '6S': spades6,
  '7S': spades7,
  '8S': spades8,
  '9S': spades9,
  '10S': spades10,
  'JS': spadesJack,
  'QS': spadesQueen,
  'KS': spadesKing,
};

const getCardImage = card => get(cardsBySuitRank, card);

export default getCardImage;

export const getBackOfCard = () => backOfCard;
