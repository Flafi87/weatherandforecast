import React from "react";
import Chart from "react-apexcharts";
import PropTypes from 'prop-types';
import chartSettings from './chartSettings'
import { temperatureArray, rainArray } from '../helperFunctions';

const TempChart = ({ forecast }) => {

  const forecastTemp = temperatureArray(forecast);
  const forecastRain = rainArray(forecast);
  console.log(forecastTemp);
  console.log(forecastRain);
  return (
    <div className="app" id="tempChart">
      <div className="mixed-chart">
        <Chart
          options={chartSettings}
          series={[
            { name: "Rain", type: "bar", data: forecastRain },
            { name: "Temperature max", type: "line", data: forecastTemp.max },
            { name: "Temperature min", type: "line", data: forecastTemp.min },
          ]}
        />
      </div>
    </div>
  );
}

TempChart.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TempChart;
