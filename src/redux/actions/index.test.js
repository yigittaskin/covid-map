import {
    fetchCountriesRequest,
    fetchCountriesSuccess,
    fetchCountriesFailure,
    fetchCountryDetailRequest,
    fetchCountryDetailSuccess,
    fetchCountryDetailFailure,
  } from './index';
  
  describe('Redux Actions', () => {
    it('should create an action to fetch countries request', () => {
      const expectedAction = {
        type: 'FETCH_COUNTRIES_REQUEST',
      };
      expect(fetchCountriesRequest()).toEqual(expectedAction);
    });
  
    it('should create an action to fetch countries success', () => {
      const countries = ['USA', 'Canada'];
      const expectedAction = {
        type: 'FETCH_COUNTRIES_SUCCESS',
        payload: countries,
      };
      expect(fetchCountriesSuccess(countries)).toEqual(expectedAction);
    });
  
    it('should create an action to fetch countries failure', () => {
      const error = 'Error fetching countries';
      const expectedAction = {
        type: 'FETCH_COUNTRIES_FAILURE',
        payload: error,
      };
      expect(fetchCountriesFailure(error)).toEqual(expectedAction);
    });
  
    it('should create an action to fetch country detail request', () => {
      const country = 'USA';
      const expectedAction = {
        type: 'FETCH_COUNTRY_DETAIL_REQUEST',
        payload: country,
      };
      expect(fetchCountryDetailRequest(country)).toEqual(expectedAction);
    });
  
    it('should create an action to fetch country detail success', () => {
      const countryDetail = { country: 'USA', cases: 100 };
      const expectedAction = {
        type: 'FETCH_COUNTRY_DETAIL_SUCCESS',
        payload: countryDetail,
      };
      expect(fetchCountryDetailSuccess(countryDetail)).toEqual(expectedAction);
    });
  
    it('should create an action to fetch country detail failure', () => {
      const error = 'Error fetching country detail';
      const expectedAction = {
        type: 'FETCH_COUNTRY_DETAIL_FAILURE',
        payload: error,
      };
      expect(fetchCountryDetailFailure(error)).toEqual(expectedAction);
    });
  });
  