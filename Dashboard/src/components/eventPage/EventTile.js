import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Link } from '@material-ui/core';

const EventTile = ({ event }) => {
  const formattedStartTime = moment.unix(event.startTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/mm/YY, h:mm a');
  const formattedEndTime = moment.unix(event.endTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/mm/YY, h:mm a');
  
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
          <Link href={`/integrator/${event.integrator.id}`} component={Button} size="small">
            {event.integrator.name}
          </Link>
          <Button size="small" onClick={() => window.open(event.shopUrl, '_blank')}>
            View Ticket Store
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventTile;
