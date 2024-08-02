// Ülkelerin listesini çekmek için bir istek başlatıldığında kullanılan action.
export const fetchCountriesRequest = () => ({
  type: 'FETCH_COUNTRIES_REQUEST',
});

// Ülkelerin listesi başarıyla alındığında kullanılacak action.
// payload, API'den gelen ülkelerin listesini içerir.
export const fetchCountriesSuccess = (countries) => ({
  type: 'FETCH_COUNTRIES_SUCCESS',
  payload: countries,
});

// Ülkelerin listesini çekerken bir hata oluştuğunda kullanılacak action.
// payload, oluşan hatanın mesajını içerir.
export const fetchCountriesFailure = (error) => ({
  type: 'FETCH_COUNTRIES_FAILURE',
  payload: error,
});

// ülkenin detaylarını çekmek için bir istek
// payload, detayları istenen ülkenin adını içerir.
export const fetchCountryDetailRequest = (country) => ({
  type: 'FETCH_COUNTRY_DETAIL_REQUEST',
  payload: country,
});

// ülkenin detayları başarıyla alındığı action.
// payload , API'den gelen ülke detaylarını içerir.
export const fetchCountryDetailSuccess = (countryDetail) => ({
  type: 'FETCH_COUNTRY_DETAIL_SUCCESS',
  payload: countryDetail,
});

// ülkenin detaylarını çekerken bir hata oluştuğunda kullanılacak action.
// payload, oluşan hatanın mesajını içerir.
export const fetchCountryDetailFailure = (error) => ({
  type: 'FETCH_COUNTRY_DETAIL_FAILURE',
  payload: error,
});
