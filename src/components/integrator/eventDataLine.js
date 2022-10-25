import React from 'react'
import {
  TableCell,
  TableRow
} from '@mui/material'

function EventDataLine(props) {
  const {
    key,
    id,
    eventName,
    fuel,
    soldCount
  } = props;
  
  return (
    <>
    <TableRow hover >
      <TableCell>
        {eventName}
      </TableCell>
      <TableCell>
        {fuel}
      </TableCell>
      <TableCell>
        {soldCount}
      </TableCell>
    </TableRow>        
    </>
  )
}

export default EventDataLine
