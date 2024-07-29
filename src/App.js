import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch yerine Routes kullanılıyor
import { Provider } from 'react-redux';
import store from './redux/store';
import WorldMap from './components/WorldMap';
import CountryDetail from './components/CountryDetail';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<WorldMap />} />
            <Route path="/country/:country" element={<CountryDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
