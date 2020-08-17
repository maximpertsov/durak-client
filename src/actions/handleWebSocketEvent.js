import get from 'lodash/get';

import attack from 'actions/attack';
import collect from 'actions/collect';
import defend from 'actions/defend';
import yieldAttack from 'actions/yieldAttack';

const eventActions = {
  attacked: attack,
  collected: collect,
  defended: defend,
  yielded_attack: yieldAttack,
};

const handleWebSocketEvent = message => dispatch => {
  const action = get(eventActions, message.type);
  if (!action) {
    return;
  }
  dispatch(
    action({
      user: message.user,
      toState: message.toState,
      ...message.payload,
    }),
  );
};

export default handleWebSocketEvent;
