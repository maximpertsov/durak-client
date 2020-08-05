import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchEvents from 'actions/fetchEvents';
import fetchGame from 'actions/fetchGame';
import { useWebSocketContext } from 'utils/websockets';

const GameInitializer = () => {
  const io = useWebSocketContext();
  const dispatch = useDispatch();

  const remoteDataState = useSelector(state => state.remoteDataState);

  useEffect(() => {
    if (remoteDataState !== 'NOT_FETCHED') return;

    dispatch(fetchGame());
  }, [dispatch, remoteDataState]);

  useEffect(() => {
    if (remoteDataState !== 'FETCHED_GAME') return;

    dispatch(fetchEvents(io));
  }, [dispatch, io, remoteDataState]);

  return null;
};

export default GameInitializer;
