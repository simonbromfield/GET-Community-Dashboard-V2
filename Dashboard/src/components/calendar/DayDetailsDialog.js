import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Paper, Typography, Chip, Link, Button } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import moment from 'moment';
import Event from './Event';

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
          event.name ? <Event event={event} key={event.id} /> : null
        ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default DayDetailsDialog;

