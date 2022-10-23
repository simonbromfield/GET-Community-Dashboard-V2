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
    soldCount,
    link
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
      <TableCell>
        {link}
      </TableCell>
    </TableRow>        
    </>
  )
}

export default EventDataLine
