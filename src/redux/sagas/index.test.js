import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import axios from 'axios';
import rootSaga, { fetchCountries, fetchCountryDetail } from './index';
import * as actions from '../actions';

jest.mock('axios');

describe('fetchCountries saga', () => {
  it('fetches countries successfully', () => {
    const mockCountries = ['USA', 'Canada', 'Mexico'];
    axios.get.mockResolvedValue({ data: { response: mockCountries } });

    return expectSaga(fetchCountries)
      .put(actions.fetchCountriesSuccess(mockCountries))
      .run();
  });

  it('handles errors', () => {
    const error = new Error('Failed to fetch countries');
    axios.get.mockRejectedValue(error);

    return expectSaga(fetchCountries)
      .put(actions.fetchCountriesFailure(error.message))
      .run();
  });
});

describe('fetchCountryDetail saga', () => {
  it('fetches country detail successfully', () => {
    const mockCountryDetail = {
      country: 'USA',
      continent: 'North America',
      population: 331000000,
      cases: { total: 30000000, new: '+50000', active: 500000, critical: 10000, recovered: 29000000, '1M_pop': '90000' },
      deaths: { total: 500000, new: '+1000', '1M_pop': '1500' },
      tests: { total: 350000000, '1M_pop': '1000000' },
      day: '2022-01-01',
      time: '2022-01-01T00:00:00Z'
    };
    axios.get.mockResolvedValue({ data: { response: [mockCountryDetail] } });

    return expectSaga(fetchCountryDetail, { payload: 'USA' })
      .put(actions.fetchCountryDetailSuccess(mockCountryDetail))
      .run();
  });

  it('handles errors', () => {
    const error = new Error('Failed to fetch country detail');
    axios.get.mockRejectedValue(error);

    return expectSaga(fetchCountryDetail, { payload: 'USA' })
      .put(actions.fetchCountryDetailFailure(error.message))
      .run();
  });
});
