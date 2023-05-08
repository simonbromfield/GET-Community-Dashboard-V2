import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material';
import Head from 'next/head';
let W3CWebSocket = require('websocket').w3cwebsocket;
import Calendar from "../components/calendar/Calendar";
import CircularProgress from '@mui/material/CircularProgress';

const CalendarPage = () => {
  const [eventData, setEventData] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = new W3CWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    client.onopen = () => {
      client.send(JSON.stringify({ action: 'requestAllEvents' }));
    };
    client.onmessage = (msg) => {
      let receivedMessage = JSON.parse(msg.data);
    
      if (receivedMessage.type === 'allEvents') {
        setEventData(receivedMessage.data);
        setLoading(false);
      }
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
            <CircularProgress />
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
