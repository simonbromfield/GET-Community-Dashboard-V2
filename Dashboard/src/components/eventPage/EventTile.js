import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const EventTile = ({ event }) => {
  const formattedStartTime = moment(event.startTime).format('MMMM Do YYYY, h:mm a');
  const formattedEndTime = moment(event.endTime).format('MMMM Do YYYY, h:mm a');

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={event.imageUrl}
          title={event.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <p>Start Time: {formattedStartTime}</p>
          <p>End Time: {formattedEndTime}</p>
        </CardContent>
        <CardActions>
          <Button size="small">{event.integrator.name}</Button>
          <button onClick={() => window.location.href = event.shopUrl}>View Shop</button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventTile;
