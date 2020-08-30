import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '..';

jest.mock('react-redux');

const store = mockStore({
  hands: {
    anna: ['QS'],
  },
  user: 'anna',
});

test('snapshot', () => {
  let wrapper;

  beforeEach(() => {
    useDispatch.mockReturnValue(store.dispatch);
    useSelector.mockImplementation(callback => callback(store.getState()));
    wrapper = shallowWithStore(<Card card="QS" />, store);
  });

  expect(wrapper).toMatchSnapshot();
});
