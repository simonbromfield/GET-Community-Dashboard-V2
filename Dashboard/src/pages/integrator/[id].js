import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import IntegratorDetails from '../../components/integratorProfile/Profile';

const IntegratorProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DashboardLayout>
      <>
        <Head>
          <title>Integrator Profile | GET Protocol Community</title>
        </Head>
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
          <Container maxWidth={false}>
            <IntegratorDetails integratorId={id} />
          </Container>
        </Box>
      </>
    </DashboardLayout>
  );
};

export default IntegratorProfile;
