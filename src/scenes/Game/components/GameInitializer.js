import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchGame from 'actions/fetchGame';

const GameInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame());
  }, [dispatch]);

  return null;
};

export default GameInitializer;
