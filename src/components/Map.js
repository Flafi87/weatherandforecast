import ReactMapboxGl, {  Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZmxhZmk4NyIsImEiOiJjanpzYjlhYWEwcGJiM2NwbzQwd3FqaXkwIn0.5CeZemKLYgK4JI4AHSM3lA'
});

const MyMap = ({ curCity, weather }) => {
  const { temp } = weather
  const weatherCondition = `owf owf-${weather.weather[0].id} owf-5x`;
  const { lon, lat } = curCity
  React.useEffect(() => { console.log("component updated"); });
  console.log(curCity);

  const map =
    (<Map
      style="mapbox://styles/mapbox/streets-v9" className="mapbox-container" center={[lon, lat]} zoom={[8]}
    >
      <Marker
        coordinates={[lon, lat]}
        anchor="bottom">
        <div className={weatherCondition} />
        <p className = 'map-marker'>
          {temp}
          {' '}
                  C°
                </p>
      </Marker>
    </Map>)
  return (map)


}



export default MyMap
