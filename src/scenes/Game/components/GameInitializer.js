import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchEvents from 'actions/fetchEvents';
import fetchGame from 'actions/fetchGame';
import { getGame } from 'reducers';

const GameInitializer = () => {
  const dispatch = useDispatch();

  const game = useSelector(() => getGame());
  const remoteDataState = useSelector(state => state.remoteDataState);

  useEffect(() => {
    if (!game) return;
    if (remoteDataState !== 'NOT_FETCHED') return;

    dispatch(fetchGame({ game }));
  }, [dispatch, game, remoteDataState]);

  useEffect(() => {
    if (!game) return;
    if (remoteDataState !== 'FETCHED_GAME') return;

    dispatch(fetchEvents({ game }));
  }, [dispatch, game, remoteDataState]);

  return null;
};

export default GameInitializer;
