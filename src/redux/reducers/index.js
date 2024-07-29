import { combineReducers } from 'redux';

const initialState = {
  countries: [],
  countryDetail: {},
  loading: false,
  error: null,
};

const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COUNTRIES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_COUNTRIES_SUCCESS':
      return { ...state, loading: false, countries: action.payload };
    case 'FETCH_COUNTRIES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_COUNTRY_DETAIL_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_COUNTRY_DETAIL_SUCCESS':
      return { ...state, loading: false, countryDetail: action.payload };
    case 'FETCH_COUNTRY_DETAIL_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  covid: covidReducer,
});
