import React from 'react';
import EventTile from './EventTile';
import { Grid } from '@mui/material';

const EventList = ({ events, loading, isSearching }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      {events.map((event, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <EventTile event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
