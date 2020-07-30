import actions from 'actions';

const defend = ({ player, baseCard, card }) => dispatch => {
  const { suit, rank } = card;

  dispatch(actions.game.table.stack({ baseCard, card }));
  dispatch(actions.game.hand.remove({ suit, rank, player }));
};

export default defend;
