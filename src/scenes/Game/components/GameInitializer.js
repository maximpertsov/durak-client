import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchEvents from 'actions/fetchEvents';
import fetchGame from 'actions/fetchGame';

const GameInitializer = () => {
  const dispatch = useDispatch();

  const remoteDataState = useSelector(state => state.remoteDataState);
  const game = useSelector(state => state.game);

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
