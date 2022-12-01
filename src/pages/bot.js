import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material'
import Head from 'next/head'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

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
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="GET_comm_dash"
            options={{height: 700}}
          />
        </Box>
      </>      
    )
}

TopUps.getLayout = (page) => (
  <>
  <Head>
    <title>
      Twitter Bot | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default TopUps
