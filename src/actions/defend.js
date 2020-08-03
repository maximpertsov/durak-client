import actions from 'actions';

const defend = ({ baseCard, card, user }) => dispatch => {
  const { suit, rank } = card;

  dispatch(actions.game.table.stack({ baseCard, card }));
  dispatch(actions.game.hand.remove({ suit, rank, user }));
  dispatch(actions.game.yielded.clear());
};

export default defend;
