import React, { Component } from "react";
import Axios from "axios";
import { Button, Spinner } from 'reactstrap';
import Header from "./Header";
import ForecastSection from "./forecastSection";
import TopButtons from './buttons/TopButtons'
import env from '../config'


const [Warszawa, Kiskunmajsa, Budapest] = [{ name: 'Warszawa', lat: 52.22, lon: 21.01 }, { name: 'Kiskunmajsa', lat: 46.49, lon: 19.73 }, { name: 'Budapest', lat: 47.49, lon: 19.04 }];
const { APIkey } = env
class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      forecast: null,
      error: null,
      cityName: "Warszawa",
      curCity: { lat: 52.22, lon: 21.01, name: "Warszawa" }
    };
  }

  componentDidMount() {
    const { curCity } = this.state
    this.downloadWeather(curCity);
  }

  checkWeatherByCoord = () => {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        const lon = parseFloat(position.coords.longitude).toFixed(2);
        const lat = parseFloat(position.coords.latitude).toFixed(2);
        Axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${APIkey}&units=metric`).then(
          weather => {
            this.setState({
              weather: weather.data.current,
              cityName: `Latitude:${lat} Longitude:${lon}`,
              forecast: weather.data.daily
            });
          },
          error => {
            this.setState({
              error
            });
          }
        );
      },
    );
  };

  downloadWeather(city) {
    const { lat, lon, name } = city
    Axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${APIkey}&units=metric`).then(
      weather => {
        this.setState({ cityName: name, weather: weather.data.current, forecast: weather.data.daily });
      },
      error => {
        this.setState({ error });
      }
    );
  }


  render() {
    const { error, weather, forecast, cityName } = this.state;
    const spinner = (
      <div className="d-flex justify-content-center align-middle">
        <Spinner color="primary" />
      </div>
    )
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div className="container">
        <TopButtons />
        <div className="jumbotron">
          <h1 className="text-center">
            Current Weather
          </h1>
          <div className="text-center d-flex justify-content-center">
            <h2 className="cityname">{cityName}</h2>
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            <Button
              className="m-2"
              onClick={() => this.downloadWeather(Warszawa)}
            >
              Warszawa
            </Button>
            <Button
              className="m-2"
              onClick={() => this.downloadWeather(Kiskunmajsa)}
            >
              Kiskunmajsa
            </Button>
            <Button
              className="m-2"
              onClick={() => this.downloadWeather(Budapest)}
            >
              Budapest
            </Button>
            <Button
              className="m-2"
              onClick={this.checkWeatherByCoord}
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
}

export default App;

