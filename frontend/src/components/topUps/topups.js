import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';

const integratorBtnStyle = {
  margin: 1,
  backgroundColor: 'none',
  color: '#170742',
  '&:hover': {
    background: 'none',
  },
};

function TopUpDataLine(props) {
  const {
    key,
    blockTimestamp,
    blockNumber,
    intagrator,
    getPrice,
    total,
    totalUsd,
    txlink,
    intagratorLink,
  } = props;
  return (
    <>
      <TableRow hover key={key}>
        <TableCell>{blockTimestamp}</TableCell>
        <TableCell>
          <Button
            size="large"
            href={intagratorLink}
            sx={{ integratorBtnStyle }}
          >
            {intagrator}
          </Button>
        </TableCell>
        <TableCell>${getPrice}</TableCell>
        <TableCell>{total} GET</TableCell>
        <TableCell>${totalUsd}</TableCell>
        <TableCell>
          <Button href={txlink} target="_blank">
            <OpenInNewIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TopUpDataLine;
