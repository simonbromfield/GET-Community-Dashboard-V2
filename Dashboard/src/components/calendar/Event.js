import React from 'react';
import {
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Chip,
  Link,
  Button,
  Grid,
  CardMedia,
} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import moment from 'moment';

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

const Event = ({ event }) => {
  return (
    <Paper variant="outlined" square sx={{ padding: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {event.imageUrl ? (
            <CardMedia
              component="img"
              height="140"
              image={event.imageUrl}
              alt={event.name}
              sx={{ borderRadius: '8px' }}
            />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image="/placeholder.png"
              alt="Placeholder"
              sx={{ borderRadius: '8px' }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h6" component="h3" noWrap>
            {truncateString(event.name, 50)}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {' '}
            ({parseFloat(event.reservedFuel).toFixed(2)} GET: reservedFuel)
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Link href={`/event/${event.id}`} passHref target="_blank">
                <Button variant="outlined" fullWidth>
                  {truncateString(event.name, 20)}
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href={`/integrator/${event.integrator.id}`} passHref target="_blank">
                <Button variant="outlined" fullWidth>
                  {truncateString(event.integrator.name, 20)}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <Chip
                sx={{backgroundColor: '#59C399', color: 'white'}}
                icon={<ConfirmationNumberIcon />}
                label={`${event.soldCount} Sold`} />
            </Grid>
            <Grid item>
              <Chip
                sx={{backgroundColor: '#E8A845', color: 'white'}}
                icon={<ConfirmationNumberIcon />}
                label={`${event.scannedCount} Scanned`} />
            </Grid>
            <Grid item>
              <Chip
                sx={{backgroundColor: '#EC5F58', color: 'white'}}
                icon={<ConfirmationNumberIcon />}
                label={`${event.invalidatedCount} Invalidated`} />
            </Grid>
            <Grid item>
              <Chip
                sx={{backgroundColor: '#325FEB', color: 'white'}}
                icon={<ConfirmationNumberIcon />}
                label={`${event.checkedInCount} Checked In`} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Event;
