import React from 'react';
import BuySell from './buysell';
import GETVolume from './getVolume';
import ETHVolume from './ethVolume';
import { TableCell, TableRow } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';

function TradeDataLine(props) {
  const {
    blockNumber,
    amount,
    amount0In,
    amount0Out,
    amount1In,
    amount1Out,
    txlink,
  } = props;
  return (
    <>
      <TableRow hover>
        <TableCell>
          <BuySell amount0In={amount0In} />
        </TableCell>
        <TableCell>${Number(amount).toFixed(2)}</TableCell>
        <TableCell>
          <GETVolume amount0In={amount0In} amount0Out={amount0Out} />
        </TableCell>
        <TableCell>
          <ETHVolume amount1In={amount1In} amount1Out={amount1Out} />
        </TableCell>
        <TableCell>
          <Button href={txlink} target="_blank">
            <OpenInNewIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TradeDataLine;
