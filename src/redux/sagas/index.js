import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchCountryDetailSuccess,
  fetchCountryDetailFailure,
} from '../actions';

const API_BASE_URL = 'https://covid-193.p.rapidapi.com';
const API_KEY = '195f38bb74msh4cec00010b58876p1f1363jsnfb41ea392b22';
const API_HOST = 'covid-193.p.rapidapi.com';

function* fetchCountries() {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/countries`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });
    yield put(fetchCountriesSuccess(response.data.response));
  } catch (error) {
    console.error('Fetch countries error:', error.response || error.message);
    yield put(fetchCountriesFailure(error.message));
  }
}

function* fetchCountryDetail(action) {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/statistics`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
      params: { country: action.payload },
    });
    yield put(fetchCountryDetailSuccess(response.data.response[0]));
  } catch (error) {
    console.error('Fetch country detail error:', error.response || error.message);
    yield put(fetchCountryDetailFailure(error.message));
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_COUNTRIES_REQUEST', fetchCountries);
  yield takeLatest('FETCH_COUNTRY_DETAIL_REQUEST', fetchCountryDetail);
}

export default rootSaga;
