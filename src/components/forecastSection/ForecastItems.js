import React from 'react';
import { ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

const ForecastItems = ({ condition, temperature }) => {
  const weather = `owf owf-${condition} text-center owf-3x py-0`

  return (
    <ListGroupItem className="py-1 px-1 align-middle">
      <span className={weather} />
      <div className="d-flex justify-content-around">
        <p className="py-0 my-0">
          {' '}
          Min:{' '}
          {temperature.min.toFixed(1)}
          C°
          {' '}
        </p>
        <p className="py-0 my-0">
          {' '}
          Max:{' '}
          {temperature.max.toFixed(1)}
          C°
          {' '}
        </p>
      </div>
    </ListGroupItem>
  )
}

ForecastItems.propTypes = {
  temperature: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number
  }),
  condition: PropTypes.number.isRequired,
}

export default ForecastItems;