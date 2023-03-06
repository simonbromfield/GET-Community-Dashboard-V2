import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import TopEventCards from '../components/event/topEventCards';

import LoadingSVG from '../components/loading/loadingSVG';

const getSubGraphURL =
  'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph';

const Events = (props) => {
  const [topEvents, setTopEvents] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTopEvents = async (name) => {
    try {
      await axios
        .post(getSubGraphURL, {
          query: `
                {
                  events(orderBy: reservedFuel, orderDirection: desc, first: 50) {
                    name
                    imageUrl
                    soldCount
                    resoldCount
                    scannedCount
                    invalidatedCount
                    checkedInCount
                    claimedCount
                    reservedFuel
                    integrator{
                      id
                      name
                    }
                    startTime
                    createTx
                  }
                } 
                `,
        })
        .then((res) => {
          res = res.data.data.events;
          setTopEvents(res);
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopEvents();
  }, []);

  const displayTopEvents = () => {
    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            marginLeft="14px"
          >
            Top events by GET usage of all time
          </Typography>
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              {topEvents
                ? topEvents.map((event) => (
                    <TopEventCards
                      key={event.id}
                      eventName={event.name}
                      integrator={event.integrator.name}
                      imageUrl={event.imageUrl}
                      eventID={event.id}
                      integratorID={event.integrator.id}
                      createTx={event.createTx}
                      getUsed={event.reservedFuel}
                      soldCount={event.soldCount}
                      reSoldCount={event.resoldCount}
                      scannedCount={event.scannedCount}
                      invalidatedCount={event.invalidatedCount}
                      checkedInCount={event.checkedInCount}
                      claimedCount={event.claimedCount}
                    />
                  ))
                : null}
            </Grid>
          </Container>
        </Box>
      </>
    );
  };

  return <>{loading ? displayTopEvents() : <LoadingSVG />}</>;
};

Events.getLayout = (page) => (
  <>
    <Head>
      <title>Top Events| GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default Events;
