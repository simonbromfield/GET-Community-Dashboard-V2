import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider
} from '@mui/material';
import {
  totalTicketSales,
  totalEvents,
  fuelFormat
} from '../../utils/helpers'

const TicketsSoldApp = (props) => {
  let { protocolData } = props;

  const displayTicketsSold = () => {
    return (<>
      <Card>
        <CardContent>
          <Typography
            color="textSecondary"
          >
            TOTAL TICKETS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
            sx={{
              marginBottom: 3 
            }}
          >
            { totalTicketSales(protocolData.soldCount) }
          </Typography>
          
          <Typography
            color="textSecondary"
          >
            TOTAL EVENTS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
            sx={{
              marginBottom: 3 
            }}
          >
            { totalEvents(protocolData.eventCount) }
          </Typography>
          
          <Typography
            color="textSecondary"
          >
            SPENT FUEL
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {fuelFormat(protocolData.collectedSpentFuel)}
          </Typography>
          
        </CardContent>
      </Card>
      </>   
    )
  }

  return <div>
        { protocolData ? displayTicketsSold() :
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="inherit" />
      </Box>
    }
  </div>
}

export default TicketsSoldApp
