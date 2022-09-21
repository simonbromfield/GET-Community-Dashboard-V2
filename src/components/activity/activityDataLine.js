import React from 'react'
import Link from 'next/link'
import Moment from 'moment'
import ActivityType from './activityType'
import DisplayPrice from './displayPrice'
import {
  TableCell,
  TableRow,
  Button
} from '@mui/material'

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
  const eventLink = `/event/${eventID}`
  const integratorLink = `/integrator/${integratorID}`
  
  return (
    <>
    <TableRow hover >
      <TableCell>
          <strong>#{nftId}</strong><br />
          {Moment.unix(blockTimestamp).format("hh:mm:ss a")}
      </TableCell>
      <TableCell>
        <Link href={eventLink}
            passHref>
          <Button variant="text"> {eventName} </Button>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={integratorLink}
            passHref>
          <Button variant="text"> {integrator} </Button>
        </Link>
      </TableCell>
      <TableCell>
        <DisplayPrice price={price}/>
      </TableCell>
      <TableCell>
          {getUsed}
      </TableCell>
      <TableCell>
        <ActivityType activityType={activityType} />
      </TableCell>
    </TableRow>        
    </>
  )
}

export default ActivityDataLine
