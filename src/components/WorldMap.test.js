import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WorldMap from './WorldMap';
import rootReducer from '../redux/reducers';
import { fetchCountriesSuccess } from '../redux/actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('renders loading animation while fetching countries', () => {
  const initialState = {
    covid: {
      countries: [],
      loading: true,
      error: null,
    },
  };
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <WorldMap />
    </Provider>
  );

  const loadingElement = screen.getByAltText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders country list after fetching countries', async () => {
  const initialState = {
    covid: {
      countries: [],
      loading: false,
      error: null,
    },
  };
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <WorldMap />
    </Provider>
  );

  store.dispatch(fetchCountriesSuccess(['USA', 'Canada', 'Mexico']));

  await waitFor(() => {
    const countryElement = screen.getByText(/USA/i);
    expect(countryElement).toBeInTheDocument();
  });

  const canadaElement = screen.getByText(/Canada/i);
  expect(canadaElement).toBeInTheDocument();

  const mexicoElement = screen.getByText(/Mexico/i);
  expect(mexicoElement).toBeInTheDocument();
});

test('renders error message if fetching countries fails', () => {
  const initialState = {
    covid: {
      countries: [],
      loading: false,
      error: 'Failed to fetch countries',
    },
  };
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <WorldMap />
    </Provider>
  );

  const errorElement = screen.getByText(/Failed to fetch countries/i);
  expect(errorElement).toBeInTheDocument();
});
