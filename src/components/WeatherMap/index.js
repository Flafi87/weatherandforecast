import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmxhZmk4NyIsImEiOiJjanpzYjlhYWEwcGJiM2NwbzQwd3FqaXkwIn0.5CeZemKLYgK4JI4AHSM3lA",
});

const WeatherMap = ({ curCity:{lon,lat}, weather:{temp},weather }) => {
  const weatherCondition = `owf owf-${weather.weather[0].id} owf-5x`;

  return (
    <Map
      style="mapbox://styles/flafi87/ckifuffac4yeo19s2qriiqgn6"
      className="mapbox-container"
      center={[lon, lat]}
      zoom={[8]}
    >
      <Marker coordinates={[lon, lat]} anchor="bottom">
        <div className={weatherCondition} />
        <p className="map-marker">{temp.toFixed(1)} C°</p>
      </Marker>
    </Map>
  );
};

export default WeatherMap;
