import spadesAce from './assets/001.png';

const cardsBySuitRank = {
  spades: {
    ace: spadesAce,
  },
};

const getCardImage = ({ rank, suit }) => cardsBySuitRank[suit][rank];

export default getCardImage;
