import React from 'react';
import { Col, ListGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import ForecastItems from './ForecastItems';

const ForecastListItem = ({ dayNumber, allData }) => {

  const dayNumber1 = `day_${dayNumber}`

  return (
    <Col className="d-flex flex-column day_box" id={dayNumber1}>
      <h4 className="text-center">{dayNumber}</h4>
      <ListGroup className="" key={dayNumber}>
        <ForecastItems className="mx-auto d-block" key={dayNumber} time={dayNumber} temperature={allData.temp} condition={allData.weather[0].id} />
      </ListGroup>
    </Col>

  )
}

ForecastListItem.propTypes = {
  dayNumber: PropTypes.string.isRequired,
  dayName: PropTypes.string.isRequired,
  allData: PropTypes.shape({
    temp:PropTypes.object,
    weather: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
}

export default ForecastListItem;