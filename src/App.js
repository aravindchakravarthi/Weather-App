import './App.css';
import Axios from 'axios';
import Card from './Components/Card';
import './StyleSheet/Card.css';
import Location from './Components/Location';
import Header from './Components/Header';
import './StyleSheet/Header.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLon, setSelectedLon] = useState(null);
  const [selectedLat, setSelectedLat] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const APIKEY = "734257a1d93af75eb13907f6aa223587";

  useEffect(() => {
    locationfetch();
  }, []);

  const locationfetch = async () => {
    try {
      const response = await Axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`);
      setCities(response.data.results);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLon}&appid=${APIKEY}&units=metric`);
      setSelectedCity(response.data);
      fetchForecastData();
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLat}&lon=${selectedLon}&appid=${APIKEY}&units=metric`);
      const forecastList = response.data.list;
      const filteredForecast = forecastList.filter((forecast, index) => index % 9 === 0);
      setForecastData(filteredForecast);
    } catch (err) {
      alert(err.message);
    }
  };

  const selectRow = (lon, lat) => {
    setSelectedLon(lon);
    setSelectedLat(lat);
  };

  useEffect(() => {
    if (selectedLon !== null && selectedLat !== null) {
      fetchData1();
    }
  }, [selectedLon, selectedLat]);

  const getDayName = (date, daysToAdd) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + daysToAdd);
    return days[tomorrow.getDay()];
  };

  useEffect(() => {
    const filteredResults = cities.filter((data) =>
      (data.ascii_name.toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [cities, search]);

  return (
    <div className="App">{selectedCity === null &&
      <Header
        search={search}
        setSearch={setSearch}
      />}
      {selectedCity === null ? (
        <Location
          selectRow={selectRow}
          searchResults={searchResults}
        />
      ) : (
        <Card
          selectedCity={selectedCity}
          forecastData={forecastData}
          getDayName={getDayName}
        />

      )}
    </div>
  );
}

export default App;
