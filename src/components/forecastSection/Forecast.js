import React from 'react';
import ForecastListItem from "./ForecastListItem";

const Forecast = ({ forecast }) => {
  return (
    forecast.map(object => {
      const date = new Date(object.dt * 1000)
      const readableDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate() + 1}`
      return (
        <ForecastListItem
          key={date}
          dayNumber={readableDate}
          dayName={readableDate}
          allData={object}
        />
      )

    }
    )
  )
}

export default Forecast