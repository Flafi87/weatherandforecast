import React from 'react';
// import { dataCalc, dayCalc, theDay } from '../helperFunctions'
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
  // console.log(`forecast`)
  // console.log(`${JSON.parse(forecast)}`)


}

export default Forecast