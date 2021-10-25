import React from "react";
import PropTypes from 'prop-types';
import Forecast from "./Forecast";
import TempChart from "../Chart";

const ForecastSection = ({ forecast }) => {
  return (
    <div>
      <div id="forecast_list" className="row">
        <Forecast forecast={forecast} />
      </div>
      <TempChart forecast={forecast} />
    </div>
  );

};

ForecastSection.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ForecastSection;
