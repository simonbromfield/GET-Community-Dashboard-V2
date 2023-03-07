import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import Button from '@mui/material/Button';

const integratorBtnStyle = {
  margin: 1,
  backgroundColor: 'none',
  color: '#170742',
  '&:hover': {
    background: 'none',
  },
};

function LeaderboardDataLine(props) {
  const {
    key,
    postion,
    eventName,
    eventLink,
    intagrator,
    intagratorLink,
    fuel,
    soldCount,
  } = props;
  return (
    <>
      <TableRow hover
key={key}>
        <TableCell>{postion}</TableCell>
        <TableCell>
          <Button size="large"
href={eventLink}
sx={{ integratorBtnStyle }}>
            {eventName}
          </Button>
        </TableCell>
        <TableCell>
          <Button
            size="large"
            href={intagratorLink}
            sx={{ integratorBtnStyle }}
          >
            {intagrator}
          </Button>
        </TableCell>
        <TableCell>{fuel} GET</TableCell>
        <TableCell>{soldCount}</TableCell>
      </TableRow>
    </>
  );
}

export default LeaderboardDataLine;
