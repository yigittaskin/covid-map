// Redux store'u oluşturmak için gerekli fonksiyonları ve middleware'leri import ediyorum
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Saga middleware'i oluşturuyorum, bu middleware Redux ile saga'ları entegre eder
const sagaMiddleware = createSagaMiddleware();

// Redux store'u oluşturuyorum
// rootReducer, uygulamanın tüm reducer'larını bir araya getirir
// applyMiddleware ile saga middleware'i Redux'a ekleniyor
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// rootSaga'yı çalıştırıyorum, bu saga middleware'i üzerinden action'ları dinlemeye başlar
sagaMiddleware.run(rootSaga);

// Oluşturulan store'u varsayılan olarak dışa aktarıyorum, böylece uygulamada kullanılabilir
export default store;
