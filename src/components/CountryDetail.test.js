import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CountryDetail from './CountryDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../redux/reducers';
import { fetchCountryDetailSuccess } from '../redux/actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('renders loading animation while fetching country detail', () => {
  const initialState = {
    covid: {
      countryDetail: {},
      loading: true,
      error: null,
    },
  };
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <Router>
        <CountryDetail />
      </Router>
    </Provider>
  );

  const loadingElement = screen.getByAltText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders country detail after fetching data', async () => {
  const initialState = {
    covid: {
      countryDetail: {},
      loading: false,
      error: null,
    },
  };
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <Router>
        <CountryDetail />
      </Router>
    </Provider>
  );

  store.dispatch(fetchCountryDetailSuccess({
    country: 'USA',
    continent: 'North America',
    population: 331000000,
    cases: { total: 30000000, new: '+50000', active: 500000, critical: 10000, recovered: 29000000, '1M_pop': '90000' },
    deaths: { total: 500000, new: '+1000', '1M_pop': '1500' },
    tests: { total: 350000000, '1M_pop': '1000000' },
    day: '2022-01-01',
    time: '2022-01-01T00:00:00Z'
  }));

  await waitFor(() => {
    const countryElement = screen.getByText(/USA/i);
    expect(countryElement).toBeInTheDocument();
  });

  const continentElement = screen.getByText(/North America/i);
  expect(continentElement).toBeInTheDocument();

  const populationElement = screen.getByText(/331000000/i);
  expect(populationElement).toBeInTheDocument();
});

test('renders error message if fetching country detail fails', () => {
  const initialState = {
    covid: {
      countryDetail: {},
      loading: false,
      error: 'Failed to fetch country detail',
    },
  };
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <Router>
        <CountryDetail />
      </Router>
    </Provider>
  );

  const errorElement = screen.getByText(/Failed to fetch country detail/i);
  expect(errorElement).toBeInTheDocument();
});
