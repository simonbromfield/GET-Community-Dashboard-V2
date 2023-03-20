import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material';
import Head from 'next/head';
import moment from 'moment';
import Calendar from "../components/calendar/Calendar";

const CalendarPage = ({ wsdata }) => {
  let noDemoList = wsdata.events.filter(e => e.integrator.id !== '0')
  const [eventWSData, setEventWSData] = useState(noDemoList)
  const events = eventWSData.map((item) => ({
    id: item.id,
    title: item.name,
    integrator: item.integrator.name,
    start: moment.unix(item.startTime).format('YYYY-MM-DD'),
    textColor: 'white',
  }));

  useEffect(() => {
    setEventWSData(noDemoList)

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
        <Calendar events={events} />
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
