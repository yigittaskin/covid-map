import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountriesRequest } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import worldData from './world-110m.json';
import loadingAnim from '../images/loading-anim.gif';

const geoUrl = worldData;

const WorldMap = () => {
  const dispatch = useDispatch();
  const { countries, loading, error } = useSelector((state) => state.covid);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountriesRequest());
  }, [dispatch]);

  const handleCountryClick = (country) => {
    navigate(`/country/${country}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={loadingAnim} alt="Loading..." />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  const countryNames = countries.map((country) => country?.toLowerCase());

  return (
    <div className='mt-3'>
      <h1>World Map</h1>
      <p>Select a country to view COVID-19 data</p>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name?.toLowerCase();
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleCountryClick(countryName)}
                  style={{
                    default: { fill: countryNames.includes(countryName) ? "#E42" : "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {/* <ul>
        {countries.map((country) => (
          <li key={country}>
            <a href={`/country/${country}`}>{country}</a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default WorldMap;
