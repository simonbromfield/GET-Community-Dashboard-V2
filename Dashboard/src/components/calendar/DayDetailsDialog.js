import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Paper, Typography, Chip, Link, Button } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import moment from 'moment';

const DayDetailsDialog = ({ open, handleClose, selectedDay, eventsList, formattedSelectedDay }) => {
  const filteredEvents = eventsList.filter((event) => {
    const eventDate = moment.unix(event.startTime).format('YYYY-MM-DD');
    return selectedDay && eventDate === selectedDay;
  });

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{formattedSelectedDay}</Typography>
      </DialogTitle>
      <DialogContent>
        <List>
          {filteredEvents.map((event) => (
            <Paper variant="outlined" square sx={{ padding: 2 }} key={event.id}>
              <ListItem key={event.id}>
                <ListItemText
                  primary={event.name}
                  secondary={
                    <>
                      <Link href={`/event/${event.id}`} passHref target="_blank">
                        <Button variant="text"> {event.name} </Button>
                      </Link>
                      <Typography component="span" variant="body2">
                        Integrator: {event.integrator.name}
                      </Typography>
                      <Chip icon={<LocalGasStationIcon />} label={parseFloat(event.reservedFuel).toFixed(2)} />
                      <Chip icon={<ConfirmationNumberIcon />} label={parseInt(event.soldCount)} />
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default DayDetailsDialog;

