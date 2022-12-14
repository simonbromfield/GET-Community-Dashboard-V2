import React from 'react'
import {
  TableCell,
  TableRow
} from '@mui/material'
import Button from '@mui/material/Button';

const integratorBtnStyle = {
  margin: 1,
  backgroundColor: "none",
  color: "#170742",
  '&:hover': {
    background: "none",
  }
};

function LeaderboardDataLine(props) {
  const { 
    key,
    postion,
    day,
    fuel,
    soldCount,
    salesVolume
  } = props;
  return (
    <>
      <TableRow hover
        key={key}>
      <TableCell>
        {postion}
      </TableCell>
      <TableCell>
        {day}
      </TableCell>
      <TableCell>
        {fuel} GET
      </TableCell>
      <TableCell>
        {soldCount}
      </TableCell>
      <TableCell>
        ${salesVolume}
      </TableCell>
    </TableRow>        
    </>
  )
}

export default LeaderboardDataLine
