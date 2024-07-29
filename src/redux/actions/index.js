export const fetchCountriesRequest = () => ({
    type: 'FETCH_COUNTRIES_REQUEST',
  });
  
  export const fetchCountriesSuccess = (countries) => ({
    type: 'FETCH_COUNTRIES_SUCCESS',
    payload: countries,
  });
  
  export const fetchCountriesFailure = (error) => ({
    type: 'FETCH_COUNTRIES_FAILURE',
    payload: error,
  });
  
  export const fetchCountryDetailRequest = (country) => ({
    type: 'FETCH_COUNTRY_DETAIL_REQUEST',
    payload: country,
  });
  
  export const fetchCountryDetailSuccess = (countryDetail) => ({
    type: 'FETCH_COUNTRY_DETAIL_SUCCESS',
    payload: countryDetail,
  });
  
  export const fetchCountryDetailFailure = (error) => ({
    type: 'FETCH_COUNTRY_DETAIL_FAILURE',
    payload: error,
  });
  