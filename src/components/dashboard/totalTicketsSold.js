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
import axios from 'axios'

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const TicketsSoldApp = (props) => {
  let { indexData } = props;

  const displayTicketsSold = () => {
    return (<>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="overline"
      >
        TOTAL TICKETS
      </Typography>
      <Typography
        color="textPrimary"
        variant="h4"
      >
        { indexData.ticketsSold }
      </Typography>
                            
      <Divider sx={{
        width: "100%",
        margin: 3
      }}/>

      <Typography
        color="textSecondary"
        gutterBottom
        variant="overline"
      >
        TOTAL EVENTS
      </Typography>
      <Typography
        color="textPrimary"
        variant="h4"
      >
        { indexData.eventCount }
      </Typography>
      </>
            
    )
  }

  return <div>
    <Card
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
    { indexData ? displayTicketsSold() :
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="inherit" />
      </Box>
    }
    </Grid>
    </Grid>
  </CardContent>
</Card>
  </div>
}

export default TicketsSoldApp
