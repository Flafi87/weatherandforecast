import React from 'react'
import { Button } from 'reactstrap';

export default function TopButtons() {
  return (
    <div className="d-flex justify-content-between">
      <Button
        className="my-3"
        color="success"
        href="https://flafi.hu/index.html#jscript"
      >
        Back to the website
      </Button>
      <Button
        className="my-3"
        color="primary"
        href="https://github.com/Flafi87/weatherandforecast"
        target="_blank"
      >
        Repo
      </Button>
    </div>
  )
}
