import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Box, Container, Grid } from '@mui/material'
import TotalTicketsSold from '../components/dashboard/totalTicketsSold'
import TokenTopUpsApp from '../components/dashboard/recentTopUps'
import TokenPrice from '../components/dashboard/tokenPrice'
import MarketCapApp from '../components/dashboard/marketCap'
import { DashboardLayout } from '../components/dashboard-layout'

class Dashboard extends React.Component {

  render() {
    return (
      <DashboardLayout>
      <>
      <Head>
        <title>
          Dashboard | GET Protocol Community
        </title>
      </Head>
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
            
            <TotalTicketsSold sx={{ height: '100%' }}  />
            
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
      </DashboardLayout>
    );
  }
}

export default Dashboard
