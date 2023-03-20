import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material';
import Head from 'next/head';
import Calendar from "../components/calendar/Calendar";

const CalendarPage = ({ wsdata }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Calendar />
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
