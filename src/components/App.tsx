import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Spinner } from "reactstrap";
import Header from "./Header";
import ForecastSection from "./forecastSection";
import TopButtons from "./buttons/TopButtons";
import env from "../config";
import MyMap from "./Map";
const { APIkey } = env;

const cities = {
  Warszawa: {
    name: "Warszawa",
    lat: 52.22,
    lon: 21.01,
  },
  Kiskunmajsa: {
    name: "Kiskunmajsa",
    lat: 46.49,
    lon: 19.73,
  },
  Budapest: {
    name: "Budapest",
    lat: 47.49,
    lon: 19.04,
  },
  Brenna: {
    name: "Brenna",
    lat: 49.732987,
    lon: 18.920351,
  },
};



const App = () => {
  const [weather, setWeather] = useState<object>({});
  const [forecast, setForecast] = useState<object>({});
  const [error, setError] = useState<string>();
  const [cityName, setCityName] = useState<string>("");
  const [curCity, setCurCity] = useState({lat:52.22,lon:21.01,name:'Warsaw'});

  const downloadWeather = ({lat,lon,name}: {lat: number,lon: number,name: string}) => {
    Axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${APIkey}&units=metric`
    ).then(
      (weather) => {
        setCityName(name);
        setWeather(weather.data.current);
        setForecast(weather.data.daily);
        setCurCity({ lat, lon,name:'coordinates' });
      },
      (error) => {
        setError(error);
      }
    );
  };

  useEffect(() => {
    downloadWeather(curCity);
  }, [curCity]);

  const buttons = () => {
    for (const [key, value] of Object.entries(cities)) {
      return (
        <Button className="m-2" onClick={() => downloadWeather(value)}>
          {key}
        </Button>
      );
    }
  };

  const checkWeatherByCoord = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const longitude= parseFloat(position.coords.longitude).toFixed(4);
      const latitude  = parseFloat(position.coords.latitude).toFixed(4);
      Axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=&appid=${APIkey}&units=metric`
      ).then(
        (weather) => {
          setCityName(`Latitude:${latitude.toString()} Longitude:${longitude.toString()}`);
          setWeather(weather.data.current);
          setForecast(weather.data.daily);
          setCurCity({ lat:latitude, lon:longitude });
        },
        (error) => {
          setError(error);
        }
      );
    });
  };

  const spinner = (
    <div className="d-flex justify-content-center align-middle">
      <Spinner color="primary" />
    </div>
  );

  const mapSection = weather ? (
    <div className="mapcontainer">
      <MyMap curCity={curCity} weather={weather} />
    </div>
  ) : (
    spinner
  );

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="container">
      <TopButtons />
      <div className="jumbotron">
        <h1 className="text-center">Current Weather</h1>
        {mapSection}
        <div className="d-flex justify-content-center flex-wrap">
          {buttons()}
          <Button className="m-2" onClick={checkWeatherByCoord}>
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
};

export default App;
