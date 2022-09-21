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

const TicketsSoldApp = () => {
  const [ticketsSold, setTicketsSold] = useState(null)
  const [events, setEvents] = useState(null)
  const [loading, setLoading] = useState(false)

  const ticketsSoldFunction = async () => {
    try {
      const data = await axios.post(getSubGraphURL, {
        query: `
                  {
                    protocol(id: "1") {
                      soldCount
                      eventCount
                    }
                  }
                `
      }
      ).then(res => {
        setTicketsSold((Number(res.data.data.protocol.soldCount) + 640630).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
        setEvents((Number(res.data.data.protocol.eventCount) + 4470).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    ticketsSoldFunction()
  }, [])

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
        { ticketsSold }
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
        { events }
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
    { loading ? displayTicketsSold() :
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
