import React from 'react'
import {
  TableCell,
  TableRow
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import moment from 'moment'

function TopUpDataLine(props) {
  const { key,
    blockTimestamp,
    blockNumber,  
    intagrator,
    getPrice,
    total,
    totalUsd,
    txlink
  } = props;
  return (
    <>
      <TableRow hover
        key={key}>
      <TableCell>
        {blockTimestamp}
      </TableCell>
      <TableCell>
        {blockNumber}
      </TableCell>
      <TableCell>
        {intagrator}
      </TableCell>
      <TableCell>
        ${getPrice}
      </TableCell>
      <TableCell>
        {total} GET
      </TableCell>
      <TableCell>
        ${totalUsd}
      </TableCell>
      <TableCell>
          <Button
            href={txlink}
            target="_blank"
          >
          <OpenInNewIcon />
          </Button>
      </TableCell>
    </TableRow>        
    </>
  )
}

export default TopUpDataLine
