import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import EventsNavigation from '../components/event/eventsNavigation'
import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material'
import Head from 'next/head'
import EventCards from '../components/event/eventCards'
import LoadingSVG from '../components/loading/loadingSVG'

const Events = ({ wsdata }) => {

  const [eventList, setEventList] = useState(wsdata.events.slice(0, 100))
  const [integrators, setIntegrators] = useState(wsdata.integrators)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      setEventList(wsdata.events.slice(0, 100))
      setIntegrators(wsdata.integrators)
      setLoading(true)
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
            Recently Created Events
            </Typography>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
            >
            
            { eventList ?
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
      {/* <EventsNavigation
        integrators={ integrators } /> */}
        { loading ? displayEvents() :
          <LoadingSVG />
        }
    </>
  )
}

Events.getLayout = (page) => (
  <>
  <Head>
    <title>
      Events | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Events
