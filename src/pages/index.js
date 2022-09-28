import React, { useEffect, useState } from 'react'
import LoadingSVG from '../components/loading/loadingSVG'
import Head from 'next/head'
import { Box, Container, Grid } from '@mui/material'
import TotalTicketsSold from '../components/dashboard/totalTicketsSold'
import TokenTopUpsApp from '../components/dashboard/recentTopUps'
import TokenPrice from '../components/dashboard/tokenPrice'
import MarketCapApp from '../components/dashboard/marketCap'
import { DashboardLayout } from '../components/dashboard-layout'
let W3CWebSocket = require('websocket').w3cwebsocket;

const Index = (props) => {
  const [indexData, setIndexData] = useState(false)

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:3001/index');
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = (msg) => {
      setIndexData(JSON.parse(msg.data))
    };
    client.onerror = function() {
      console.log('Connection Error');
    };
  }, [])
  
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid item
            lg={4}
            sm={6}
            xl={3}
            xs={12} >
            
              <TotalTicketsSold
                sx={{ height: '100%' }}
                indexData={indexData}
              />
            
            </Grid>
            <Grid item
              xl={4}
              lg={4}
              sm={6}
                  xs={12} >

            </Grid>
            <Grid item
              xl={4}
              lg={4}
              sm={6}
              xs={12} >
                  
              <TokenPrice sx={{ height: '100%' }} />
              <MarketCapApp sx={{ height: '100%' }} />
                  
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <TokenTopUpsApp />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

Index.getLayout = (page) => (
  <>
  <Head>
    <title>
      Dashboard | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Index