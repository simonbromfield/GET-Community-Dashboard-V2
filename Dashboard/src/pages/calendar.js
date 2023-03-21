import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material';
import Head from 'next/head';
import moment from 'moment';
let W3CWebSocket = require('websocket').w3cwebsocket;
import Calendar from "../components/calendar/Calendar";

const CalendarPage = () => {
  const [eventData, setEventData] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:3001/');
    client.onopen = () => {
      // Send a message to the server indicating the client wants the 'allEvents' data
      client.send(JSON.stringify({ action: 'requestAllEvents' }));
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data);
      setEventData(pageData)
      setLoading(false);
    };
    client.onerror = function () {
      console.log('Connection Error');
    };
    
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          padding: 3
        }}
      >
        <div>
          {loading ? (
            <div>LOADING</div>
          ) : (
            <Calendar events={eventData} />
          )}
        </div>
      </Box>
    </>
  );
};

CalendarPage.getLayout = (page) => (
  <>
    <Head>
      <title>Events Calendar | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default CalendarPage;
