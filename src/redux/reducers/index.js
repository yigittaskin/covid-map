import { combineReducers } from 'redux';

// Uygulamanın başlangıç durumunu tanımlıyorum.
// Bu durum, ülkeler, belirli bir ülkenin detayları, yükleme durumu ve hata mesajlarını içeriyor.
const initialState = {
  countries: [],
  countryDetail: {},
  loading: false,
  error: null,
};

// COVID-19 verilerini yönetmek için bir reducer tanımlıyorum.
// Gelen action türlerine göre durumu güncelliyorum.
const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    // Ülkelerin listesini çekme isteği başlatıldığında yükleme durumunu true yapıyorum.
    case 'FETCH_COUNTRIES_REQUEST':
      return { ...state, loading: true };

    // Ülkelerin listesi başarıyla çekildiğinde, listeyi güncelliyor ve yükleme durumunu false yapıyorum.
    case 'FETCH_COUNTRIES_SUCCESS':
      return { ...state, loading: false, countries: action.payload };

    // Ülkelerin listesini çekerken bir hata oluşursa, hatayı kaydedip yükleme durumunu false yapıyorum.
    case 'FETCH_COUNTRIES_FAILURE':
      return { ...state, loading: false, error: action.payload };

    // Belirli bir ülkenin detaylarını çekme isteği başlatıldığında yükleme durumunu true yapıyorum.
    case 'FETCH_COUNTRY_DETAIL_REQUEST':
      return { ...state, loading: true };

    // Belirli bir ülkenin detayları başarıyla çekildiğinde, detayları güncelliyor ve yükleme durumunu false yapıyorum.
    case 'FETCH_COUNTRY_DETAIL_SUCCESS':
      return { ...state, loading: false, countryDetail: action.payload };

    // Belirli bir ülkenin detaylarını çekerken bir hata oluşursa, hatayı kaydedip yükleme durumunu false yapıyorum.
    case 'FETCH_COUNTRY_DETAIL_FAILURE':
      return { ...state, loading: false, error: action.payload };

    // Yukarıdaki action türlerinden biriyle eşleşmeyen durumlarda, mevcut durumu olduğu gibi geri döndürüyorum.
    default:
      return state;
  }
};

// Birden fazla reducer'ı tek bir reducer altında birleştiriyorum.
// Şu anda sadece covidReducer var, bu yüzden onu combineReducers fonksiyonu ile birleştiriyorum.
export default combineReducers({
  covid: covidReducer,
});
