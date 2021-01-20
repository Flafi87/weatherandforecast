import React, { useEffect,useState, useCallback } from "react";
import Axios from "axios";
import { Button,  Spinner } from 'reactstrap';
import Header from "./Header";
import ForecastSection from "./forecastSection";
import TopButtons from './buttons/TopButtons'
import env from '../config';
import MyMap from './Map'


const cities = {
  Warszawa:{name: 'Warszawa', lat: 52.22, lon: 21.01},
  Kiskunmajsa:{ name: 'Kiskunmajsa', lat: 46.49, lon: 19.73 },
  Budapest:{ name: 'Budapest', lat: 47.49, lon: 19.04 },
  Brenna:{name: 'Brenna', lat: 49.732987, lon: 18.920351 }
}


const { APIkey } = env
const App = () => {

const [weather,setWeather] = useState(null);
const [forecast,setForecast] = useState(null);
const [error,setError] = useState(null);
const [curCity,setCurCity] = useState(cities.Warszawa);


const downloadWeather = useCallback(
  () => {
    const { lat, lon} = curCity
    Axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${APIkey}&units=metric`).then(
      weather => {
        setWeather(weather.data.current);
        setForecast(weather.data.daily);
      },
      error => {
        setError(error
          )
      }
    );
  },[curCity]
)

const changeCity = ({lat,lon,name}) => {
  setCurCity({lat,lon,name})
}

  useEffect(() => {downloadWeather(curCity)},[downloadWeather,curCity]);

  const checkWeatherByCoord = () => {
    window.navigator.geolocation.getCurrentPosition(
      ({coords:{longitude,latitude}}) => {
        const lon = parseFloat(longitude).toFixed(4);
        const lat = parseFloat(latitude).toFixed(4);
        setCurCity({lat,lon,name:'coordinates'})
      },
    );
  };

    const spinner = (
      <div className="d-flex justify-content-center align-middle">
        <Spinner color="primary" />
      </div>
    )

    const mapSection = weather ? <div className="mapcontainer"><MyMap curCity={curCity} weather={weather}/></div> : spinner
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div className="container">
        <TopButtons />
        <div className="jumbotron">
          {mapSection}
          <div className="d-flex justify-content-center flex-wrap">
            <Button
              className="m-2"
              onClick={() => changeCity(cities.Warszawa)}
            >
              Warszawa
            </Button>
            <Button
              className="m-2"
              onClick={() => changeCity(cities.Kiskunmajsa)}
            >
              Kiskunmajsa
            </Button>
            <Button
              className="m-2"
              onClick={() => changeCity(cities.Budapest)}
            >
              Budapest
            </Button>
            <Button
              className="m-2"
              onClick={() => changeCity(cities.Brenna)}
            >
              Brenna
            </Button>
            <Button
              className="m-2"
              onClick={checkWeatherByCoord}
            >
              Check My Location
            </Button>
          </div>
          {weather ? <Header weather={weather} /> : spinner}
        </div>
        <div className="text-center">
          <h1 className="mb-4">Weather Forecast</h1>
          {forecast ? <ForecastSection forecast={forecast} /> : spinner}
        </div>
      </div>
    );
}

export default App;

