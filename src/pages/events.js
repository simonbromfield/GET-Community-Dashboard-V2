import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import EventsNavigation from '../components/event/eventsNavigation'
import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import EventCards from '../components/event/eventCards'
import * as R from 'ramda'

import LoadingSVG from '../components/loading/loadingSVG'

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const Events = (props) => {

  const [eventList, setEventList] = useState(false)
  const [loading, setLoading] = useState(false)

  const getEventsFunction = async (name) => {
    try {
      await axios.post(getSubGraphURL, {
        query: `{
          events (orderBy: blockTimestamp, orderDirection: desc, first: 800) {
            id
            name
            imageUrl
            shopUrl
            startTime
            endTime
            createTx
            integrator{
              id
              name
            }
          }
        }  `
      }).then(res => {

        res = res.data.data.events
        res = res.filter(e => e.integrator.name !== 'Demo v1')
        res = res.filter(e => e.integrator.name !== 'YourTicketProvider v1')
        res = res.reduce((acc, current) => {
          const x = acc.find(item => item.name === current.name)
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])
        setEventList(res)
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
            Recent Events
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
        <EventsNavigation />
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
