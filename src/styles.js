export const MediaQuery = Object.freeze({
  NARROW: '@media (max-width: 720px)',
  WIDE: '@media (min-width: 720px)',
});

export const SuitEmojis = Object.freeze({
  SPADES: String.fromCodePoint(0x2660),
  HEARTS: String.fromCodePoint(0x2665),
  DIAMONDS: String.fromCodePoint(0x2666),
  CLUBS: String.fromCodePoint(0x2663),
});

export const Emoji = Object.freeze({
  BOW_AND_ARROW: String.fromCodePoint(0x1f3f9),
  DAGGER: String.fromCodePoint(0x1f5e1),
  SHIELD: String.fromCodePoint(0x1f6e1),
  POPCORN: String.fromCodePoint(0x1f37f),
  ROFL: String.fromCodePoint(0x1f923),
  ROCKET: String.fromCodePoint(0x1f680),
  SUNGLASSES: String.fromCodePoint(0x1f60e),
  THUMBS_UP: String.fromCodePoint(0x1f44d),
  UPSET: String.fromCodePoint(0x1f629),
  WHITE_FLAG: String.fromCodePoint(0x1f3f3),
  ...SuitEmojis,
});

export default {};
