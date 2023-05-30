import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import moment from 'moment';
import { Link } from '@material-ui/core';

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

const EventTile = ({ event }) => {
  const formattedStartTime = moment.unix(event.startTime).format('DD/MM/YY, h:mm a');
  const formattedEndTime = moment.unix(event.endTime).format('DD/MM/YY, h:mm a');
  const formattedBlockTimestamp = moment.unix(event.blockTimestamp).format('DD/MM/YY, h:mm a'); // format the BlockTimestamp

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const cardStyles = {
    height: '400px', // set a fixed height for the card
    border: isHovered ? '3px solid #64b292' : 'none',
    display: 'flex', // set display to flex
    flexDirection: 'column', // set flex direction to column
  };

  const contentStyles = {
    flexGrow: 1, // allow content to take up remaining space
  };

  return (
    <div>
      <Card sx={cardStyles} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <CardMedia
          sx={{ height: '50%' }} // set a fixed height for the media element
          image={event.imageUrl ? event.imageUrl : '/placeholder.png'}
          title={event.name}
        />
        <CardContent sx={contentStyles}>
          <Link href={`/event/${event.id}`}>
            {truncateString(event.name, 20)}
          </Link>
          <p><strong>Start:</strong> {formattedStartTime}</p>
          <p><strong>End:</strong> {formattedEndTime}</p>
          <p><strong>Created:</strong> {formattedBlockTimestamp}</p> {/* display the BlockTimestamp */}
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
