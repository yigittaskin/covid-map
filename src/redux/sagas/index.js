import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchCountryDetailSuccess,
  fetchCountryDetailFailure,
} from '../actions';

// API'nin temel URL'si ve gerekli API anahtarları
const API_BASE_URL = 'https://covid-193.p.rapidapi.com';
const API_KEY = '195f38bb74msh4cec00010b58876p1f1363jsnfb41ea392b22';
const API_HOST = 'covid-193.p.rapidapi.com';

// Ülkelerin listesini çekmek için kullanılan saga
function* fetchCountries() {
  try {
    // API'ye GET isteği gönderiyorum ve gelen yanıtı alıyorum
    const response = yield call(axios.get, `${API_BASE_URL}/countries`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });
    // Eğer istek başarılı olursa, başarı action'ını dispatch ediyorum ve alınan verileri gönderiyorum
    yield put(fetchCountriesSuccess(response.data.response));
  } catch (error) {
    // Eğer bir hata oluşursa, hata mesajını konsola yazdırıyorum ve hata action'ını dispatch ediyorum
    console.error('Fetch countries error:', error.response || error.message);
    yield put(fetchCountriesFailure(error.message));
  }
}

// Belirli bir ülkenin detaylarını çekmek için kullanılan saga
function* fetchCountryDetail(action) {
  try {
    // API'ye GET isteği gönderiyorum ve ülke detaylarını alıyorum
    const response = yield call(axios.get, `${API_BASE_URL}/statistics`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
      // İstenen ülke adını API'ye parametre olarak gönderiyorum
      params: { country: action.payload },
    });
    // Eğer istek başarılı olursa, başarı action'ını dispatch ediyorum ve alınan verileri gönderiyorum
    yield put(fetchCountryDetailSuccess(response.data.response[0]));
  } catch (error) {
    // Eğer bir hata oluşursa, hata mesajını konsola yazdırıyorum ve hata action'ını dispatch ediyorum
    console.error('Fetch country detail error:', error.response || error.message);
    yield put(fetchCountryDetailFailure(error.message));
  }
}

// Uygulamanın ana saga'sı, gelen action'ları dinleyip ilgili saga'yı çalıştırıyor
function* rootSaga() {
  // FETCH_COUNTRIES_REQUEST action'ı tetiklendiğinde fetchCountries saga'sını çalıştırıyorum
  yield takeLatest('FETCH_COUNTRIES_REQUEST', fetchCountries);
  // FETCH_COUNTRY_DETAIL_REQUEST action'ı tetiklendiğinde fetchCountryDetail saga'sını çalıştırıyorum
  yield takeLatest('FETCH_COUNTRY_DETAIL_REQUEST', fetchCountryDetail);
}

export default rootSaga;
