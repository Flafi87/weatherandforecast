import Axios from "axios";
const rainchecker = x => {
  if (x.rain !== undefined) {
    return x.rain;
  }
  return 0;
};

export const temperatureArray = forecast => {
  const temperatures = { min: [], max: [] }

  forecast.forEach((object) => {
    const { dt, temp } = object;
    const date = new Date(dt * 1000)
    // date.setHours(1)
    temperatures.min.push([date, temp.min]);
    temperatures.max.push([date, temp.max]);
  });
  return temperatures;
};

export const rainArray = forecast => {
  const array = [];
  forecast.forEach((object) => {
    const { dt } = object;
    const date = new Date(dt * 1000)
    // date.setHours(13)
    array.push([date, rainchecker(object)]);
  });
  return array;
};
/**
 * @param  {number} day
 * @returns {string} Returning the name of the day
 */
export const theDay = (day) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

/**  DayCalc
 * @param  {object} forecast
 * @returns {Array} Returning the days in order which we have forecast for
 */
export const dayCalc = (forecast) => {
  const days = [];
  forecast.forEach((object) => {
    const temp = object;
    const myDate = new Date(temp.dt * 1000).getDay();
    temp.day = myDate;
    if (!days.includes(myDate)) {
      days.push(myDate);
    }
  });
  return days
}
/**
 * @param  {} forecast
 * @returns {Object} return data in order by days of the week
 */
export const dataCalc = (forecast) => {
  const myData = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  forecast.forEach((object) => {
    const temp = object;
    const myDate = new Date(temp.dt * 1000).getDay();
    temp.day = myDate;
    myData[myDate].push(temp);
  });
  return myData
}

export const checkWeatherByCoord = (setCurCity) => {
  window.navigator.geolocation.getCurrentPosition(
    ({coords:{longitude,latitude}}) => {
      const lon = parseFloat(longitude).toFixed(4);
      const lat = parseFloat(latitude).toFixed(4);
      setCurCity({lat,lon,name:'coordinates'})
    },
  );
};

export const downloadWeather = ({curCity,setWeather,setForecast,setError}) => {
    const { lat, lon} = curCity
    Axios(`https://flafi.hu/onecall?lat=${lat}&lon=${lon}`).then(
      weather => {
        setWeather(weather.data.current);
        setForecast(weather.data.daily);
      },
      error => {
        setError(error
          )
      }
    );
  }
