import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material'
import Head from 'next/head'

const TopUps = ({ wsdata }) => {

  useEffect(() => {
  }, [])

    return (
      <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%"
        }}
      >
      <h3>#ticketingRevolution</h3>
        </Box>
      </>      
    )
}

TopUps.getLayout = (page) => (
  <>
  <Head>
    <title>
      #ticketingRevolution | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default TopUps
