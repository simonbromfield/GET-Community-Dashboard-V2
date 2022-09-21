import React, { useEffect, useState } from 'react'
import EventsNavigation from './eventsNavigation'
import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import EventCards from './eventCards'
import LoadingSVG from '../loading/loadingSVG'

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const IntegratorEvents = (props) => {
  const { integrator } = props;
  const [loading, setLoading] = useState(false)
  const [eventList, setEventList] = useState(false)
  const [integratorName, setIntegratorName] = useState(false)

  const getEventsFunction = async () => {
    try {
      await integrator
      await axios.post(getSubGraphURL, {
        query: `{
          integrators(where: {id: ${integrator}}){
            name
            events (orderBy: blockTimestamp, orderDirection: desc, first: 300 ) {
            id
            name
            imageUrl
            startTime
            endTime
            createTx
            integrator{
              name
            }
            }
          }
        }`
      }).then(res => {
        let events = res.data.data.integrators[0].events
        events = events.reduce((acc, current) => {
          const x = acc.find(item => item.name === current.name)
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])

        setEventList(events)
        setIntegratorName(res.data.data.integrators[0].name)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    getEventsFunction()
  }, [])

  const displayEvents = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Typography gutterBottom
          variant="h5"
          component="div"
          marginLeft="14px"
        >
          {integratorName}
        </Typography>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            {eventList ?
              eventList.map(event => (
                <EventCards
                  key={event.id}
                  eventName={event.name}
                  integrator={event.integrator.name}
                  imageUrl={event.imageUrl}
                  startTime={event.startTime}
                  eventID={event.id}
                  integratorID={event.integrator.id}
                  createTx={event.createTx}
                  shopUrl={event.shopUrl}
                />
              )) : null
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}
  
  return (
    <>
        <EventsNavigation />
        { loading ? displayEvents() :
          <LoadingSVG />
        }
    </>
  )
}

export default IntegratorEvents
