import React from "react";
import PropTypes from "prop-types";

const WeatherBar = ({ weather }) => {
  const { humidity, feels_like, visibility, clouds } = weather;
  const sunrise = new Date(weather.sunrise * 1000);
  const sunrisetime = `${sunrise.getHours()}:${`0${sunrise.getMinutes()}`.slice(
    -2
  )}`;
  const sunset = new Date(weather.sunset * 1000);
  const sunsettime = `${sunset.getHours()}:${`0${sunset.getMinutes()}`.slice(
    -2
  )}`;

  return (
    <div>
      <div className="d-flex justify-content-center flex-wrap">
        <div className="badge bg-info text-dark m-3" id="feelslike" color="secondary">
          <h5>Feels like</h5>
          <h5>{feels_like.toFixed(1)} C°</h5>
        </div>
        <div className="badge bg-info text-dark m-3" id="humidity" color="secondary">
          <div className="m-1">
            <h5>Humidity</h5>
            <h5> {humidity}%</h5>
          </div>
        </div>
        <div className="badge bg-info text-dark m-3" id="visibility" color="secondary">
          <div className="m-1">
            <h5>Visibility</h5>
            <h5>{visibility}m</h5>
          </div>
        </div>
        <div className="badge bg-info text-dark m-3" id="clouds" color="secondary">
          <div className="m-1">
            <h5>Cloudiness</h5>
            <h5>{clouds}%</h5>
          </div>
        </div>
        <div className="badge bg-info text-dark m-3" id="sunrise" color="secondary">
          <div className="m-1">
            <h5>Sunrise</h5>
            <h5>{sunrisetime}</h5>
          </div>
        </div>
        <div className="badge bg-info text-dark m-3" id="sunset" color="secondary">
          <div className="m-1">
            <h5>Sunset</h5>
            <h5>{sunsettime}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherBar.propTypes = {
  weather: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.object),
    ])
  ).isRequired,
};

export default WeatherBar;
