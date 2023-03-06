import React from 'react';
import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import EthTrades from '../components/trades/ethTrades';
import PolyTrades from '../components/trades/polyTrades';

const TradesTopUps = (props) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Grid container
spacing={2}>
          <Grid item
lg={6}
md={12}
xl={6}
xs={12}>
            <EthTrades />
          </Grid>
          <Grid item
lg={6}
md={12}
xl={6}
xs={12}>
            <PolyTrades />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

TradesTopUps.getLayout = (page) => (
  <>
    <Head>
      <title>Trades | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default TradesTopUps;
