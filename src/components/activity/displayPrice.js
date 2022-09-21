import React from 'react'
import Chip from '@mui/material/Chip';

function DisplayPrice(props) {
  let { price } = props;
  let displayPrice = ''
  if (price === "0") {
    displayPrice = 
      <Chip label="----" />
  } else {
    price = `$${price}`
    displayPrice = 
      <Chip label={price} />
  }
  return (
    <p>{displayPrice}</p>
  )
}

export default DisplayPrice
