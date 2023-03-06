import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import {
  Box,
  Container,
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Head from 'next/head';
import EventCards from '../components/event/eventCards';
import LoadingSVG from '../components/loading/loadingSVG';

const Events = ({ wsdata }) => {
  let noDemoList = wsdata.events.filter((e) => e.integrator.id !== '0');
  const [eventList, setEventList] = useState(noDemoList.slice(0, 100));
  const [loading, setLoading] = useState(false);
  const [showYTP, setShowYTP] = useState(false);

  useEffect(() => {
    setEventList(noDemoList.slice(0, 100));
    setLoading(true);
  }, []);

  const handleChange = (event, showYTP) => {
    if (showYTP === true) {
      let newList = noDemoList.filter((e) => e.integrator.id !== '3');
      setEventList(newList.slice(0, 100));
      setShowYTP(true);
    } else {
      setEventList(noDemoList.slice(0, 100));
      setShowYTP(false);
    }
  };

  const displayEvents = () => {
    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={showYTP}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ padding: 2 }}
          >
            <ToggleButton value={true}>Hide DT</ToggleButton>
            <ToggleButton value={false}>Show DT</ToggleButton>
          </ToggleButtonGroup>

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            marginLeft="14px"
          >
            Recently Created Events
          </Typography>
          <Container maxWidth={false}>
            <Grid container
spacing={3}>
              {eventList
                ? eventList.map((event) => (
                    <EventCards
                      key={event.id}
                      eventName={event.name}
                      integrator={event.integrator.name}
                      imageUrl={event.imageUrl}
                      startTime={event.startTime}
                      eventID={event.id}
                      integratorID={event.integrator.id}
                      createTx={event.createTx}
                      shopUrl={event.shopUrl}
                    />
                  ))
                : null}
            </Grid>
          </Container>
        </Box>
      </>
    );
  };

  return (
    <>
      {/* <EventsNavigation
        integrators={ integrators } /> */}
      {loading ? displayEvents() : <LoadingSVG />}
    </>
  );
};

Events.getLayout = (page) => (
  <>
    <Head>
      <title>Events | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default Events;
