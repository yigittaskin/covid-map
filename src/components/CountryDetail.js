import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetailRequest } from '../redux/actions';
import { useParams } from 'react-router-dom';
import loadingAnim from '../images/loading-anim.gif';

const CountryDetail = () => {
  const { country } = useParams();
  const dispatch = useDispatch();
  const { countryDetail, loading, error } = useSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchCountryDetailRequest(country));
  }, [dispatch, country]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={loadingAnim} alt="Loading..." />
      </div>
    );
  }
  if (error) return <p>{error}</p>;
  if (!countryDetail || Object.keys(countryDetail).length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p className='bg-danger rounded p-3 text-white w-50'>No data is available for the selected country at the moment. This could be due to a temporary issue with our data provider or the country might not have reported the latest COVID-19 statistics. Please try selecting another country or check back later. We apologize for any inconvenience caused.</p>
      </div>
    );
  };

  return (
    <div className='mt-3'>
      <h1>{countryDetail.country}</h1>
      <p><strong>Continent:</strong> {countryDetail.continent}</p>
      <p><strong>Population:</strong> {countryDetail.population}</p>
      <div className='row mt-2'>
        <div className='col-md-4 p-3' style={{ border: '1px solid black', backgroundColor: '#ffdead' }}>
          <h2>Cases</h2>
          <p><strong>Total:</strong> {countryDetail.cases?.total}</p>
          <p><strong>New:</strong> {countryDetail.cases?.new}</p>
          <p><strong>Active:</strong> {countryDetail.cases?.active}</p>
          <p><strong>Critical:</strong> {countryDetail.cases?.critical}</p>
          <p><strong>Recovered:</strong> {countryDetail.cases?.recovered}</p>
          <p><strong>Cases per 1M population:</strong> {countryDetail.cases?.['1M_pop']}</p>
        </div>
        <div className='col-md-4 p-3' style={{ border: '1px solid black', backgroundColor: '#ea0000' }}>
          <h2>Deaths</h2>
          <p><strong>Total:</strong> {countryDetail.deaths?.total}</p>
          <p><strong>New:</strong> {countryDetail.deaths?.new}</p>
          <p><strong>Deaths per 1M population:</strong> {countryDetail.deaths?.['1M_pop']}</p>
        </div>
        <div className='col-md-4 p-3' style={{ border: '1px solid black', backgroundColor: '#e0ffff' }}>
          <h2>Tests</h2>
          <p><strong>Total:</strong> {countryDetail.tests?.total}</p>
          <p><strong>Tests per 1M population:</strong> {countryDetail.tests?.['1M_pop']}</p>
          <p><strong>Day:</strong> {countryDetail.day}</p>
          <p><strong>Last Updated:</strong> {countryDetail.time}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
