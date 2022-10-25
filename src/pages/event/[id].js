import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  Box,
  Container,
  Link
} from '@mui/material'
import { DashboardLayout } from '../../components/dashboard-layout'

const EventProfile = () => {
  const router = useRouter()
  const { id } = router.query
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
            <p>This page is under construction, visit this event via dashboard v1:</p>
            <Link
              size="large"
              href={`https://sleepy-shore-42215.herokuapp.com/event-profile/${id}`}
              target="_blank"
            >
              View Event
            </Link>
      </Container>
    </Box>
    </>
    </DashboardLayout>
  );
}

export default EventProfile
