import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Container, Link } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import EventDetails from '../../components/eventProfile/eventProfile';

const EventProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DashboardLayout>
      <>
        <Head>
          <title>Event Profile | GET Protocol Community</title>
        </Head>
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
          <Container maxWidth={false}>
            <EventDetails eventId={id} />
          </Container>
        </Box>
      </>
    </DashboardLayout>
  );
};

export default EventProfile;
