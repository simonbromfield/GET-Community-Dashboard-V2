import React from 'react';
import Link from 'next/link';
import Moment from 'moment';
import ActivityType from './activityType';
import DisplayPrice from './displayPrice';
import { TableCell, TableRow, Button } from '@mui/material';

function ActivityDataLine(props) {
  const {
    blockTimestamp,
    eventName,
    integrator,
    getUsed,
    activityType,
    price,
    nftId,
    eventID,
    integratorID,
  } = props;
  const eventLink = `/event/${eventID}`;
  const integratorLink = `/integrator/${integratorID}`;

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Link
            href={`https://explorer.get-protocol.io/ticket/${nftId}`}
            target="_blank"
            passHref
          >
            <Button
              variant="text"
              sx={{
                margin: 0,
                padding: 0.2,
              }}
            >
              {' '}
              #{nftId}{' '}
            </Button>
          </Link>
          <br />
          {Moment.unix(blockTimestamp).format('hh:mm:ss a')}
        </TableCell>
        <TableCell>
          <Link href={eventLink} passHref>
            <Button variant="text"> {eventName} </Button>
          </Link>
        </TableCell>
        <TableCell>
          <Link href={integratorLink} passHref>
            <Button variant="text"> {integrator} </Button>
          </Link>
        </TableCell>
        <TableCell>
          <DisplayPrice price={price} />
        </TableCell>
        <TableCell>{Number(getUsed).toFixed(5)}</TableCell>
        <TableCell>
          <ActivityType activityType={activityType} />
        </TableCell>
      </TableRow>
    </>
  );
}

export default ActivityDataLine;
