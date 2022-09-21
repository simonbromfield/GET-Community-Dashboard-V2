import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  Box,
  Container
} from '@mui/material'
import { DashboardLayout } from '../../components/dashboard-layout'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Param: {id}</p>
}


class Trending extends React.Component {

  render() {
    return (
      <DashboardLayout>
      <>
      <Head>
        <title>
          Event Profile | GET Protocol Community
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
          <h2>EVENT PROFILE</h2>
          <Post />
        </Container>
      </Box>
      </>
      </DashboardLayout>
    );
  }
}

export default Trending
