import React, { useEffect,useState } from "react";
import { Button,  Spinner } from 'reactstrap';
import WeatherBar from "./WeatherBar";
import { checkWeatherByCoord,downloadWeather } from "../lib/helperFunctions";
import { cities } from "../lib/cities";
import ForecastSection from "./ForecastSection";
import TopButtons from './Buttons/TopButtons';
import WeatherMap from './WeatherMap';

const App = () => {

const [weather,setWeather] = useState(null);
const [forecast,setForecast] = useState(null);
const [error,setError] = useState(null);
const [curCity,setCurCity] = useState(cities.Warszawa);



const changeCity = ({lat,lon,name}) => {
  setCurCity({lat,lon,name})
}

  useEffect(() => {downloadWeather({curCity,setWeather,setForecast,setError})},[curCity]);



    const spinner = (
      <div className="d-flex justify-content-center align-middle">
        <Spinner color="primary" >{""}</Spinner>
      </div>
    )

    const mapSection = weather ? <div className="mapcontainer"><WeatherMap curCity={curCity} weather={weather}/></div> : spinner
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
              onClick={() =>checkWeatherByCoord(setCurCity)}
            >
              Check My Location
            </Button>
          </div>
          {weather ? <WeatherBar weather={weather} /> : spinner}
        </div>
        <div className="text-center">
          <h1 className="mb-4">Weather Forecast</h1>
          {forecast ? <ForecastSection forecast={forecast} /> : spinner}
        </div>
      </div>
    );
}

export default App;

