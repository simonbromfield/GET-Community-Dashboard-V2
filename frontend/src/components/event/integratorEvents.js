import React, { useEffect, useState } from 'react';
import EventsNavigation from './eventsNavigation';
import { Box, Container, Grid, Typography } from '@mui/material';
import EventCards from './eventCards';
import LoadingSVG from '../loading/loadingSVG';
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from '../../utils/config.json';

const IntegratorEvents = (props) => {
  const { integrator } = props;
  console.log(integrator);
  const [loading, setLoading] = useState(false);
  const [eventList, setEventList] = useState(false);
  const [integratorName, setIntegratorName] = useState(false);

  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send('Index Page connected');
    };
    client.onmessage = async (msg) => {
      let pageData = await JSON.parse(msg.data);
      setEventList(pageData.integrators.find((x) => x.id === id));
      if (!eventList) {
        console.log('nothing found');
      }
    };
    client.onerror = function () {
      console.log('Connection Error');
    };
  }, []);

  const displayEvents = () => {
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
            {integratorName}
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
      <EventsNavigation />
      {loading ? displayEvents() : <LoadingSVG />}
    </>
  );
};

export default IntegratorEvents;
