import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  ListItemText,
  List,
  Paper,
  Chip
} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import moment from "moment";
import LoadingSVG from '../loading/loadingSVG';

const Calendar = ({ events }) => {
  const [eventsList, setEvents] = useState(events);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEvents(events);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentMonth]);

  const renderCalendarDays = () => {
    if (loading) {
      return <LoadingSVG />;
    }

    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
      const dateEvents = eventsList.filter(
        (event) => format(new Date(moment.unix(event.startTime)), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      );

      return (
        <Grid item xs={12} sm={6} md={4} lg={2} key={day} sx={{ height: "200px" }}>
          <Paper variant="outlined" square elevation={3} sx={{ height: "100%" }}>
            <div className="day" onClick={dateEvents.length > 0 ? () => handleOpen(day) : undefined}>
              <Typography variant="h6">{format(day, "d")}</Typography>
              {dateEvents.length > 0 && (
                <Typography>{dateEvents.length} event(s)</Typography>
              )}
            </div>
          </Paper>
        </Grid>
      );
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setLoading(true);
  };

  const handleLastMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setLoading(true);
  };

  const handleOpen = (day) => {
    setSelectedDay(day);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderModal = () => {
  return (
    <Backdrop
      open={open}
      onClick={handleClose}
    >
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">
            {selectedDay ? format(selectedDay, "MMMM d, yy") : ""}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            {eventsList
              .filter(
                (event) =>
                  selectedDay &&
                  format(new Date(moment.unix(event.startTime)), "yyyy-MM-dd") ===
                    format(selectedDay, "yyyy-MM-dd")
              )
              .map((event) => (
                <ListItem key={event.id}>
                  <ListItemText
                    primary={event.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Organized by: {event.integrator.name}
                        </Typography>
                        {/* <OLMap lat={event.lat} lng={event.lng} /> */}
                      </>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </DialogContent>
        </Dialog>
    </Backdrop>
  );
};

  

  return (
    <div className="calendar">
      <Typography variant="h4" component="h2" gutterBottom>
        {format(currentMonth, "MMMM yyyy")}
      </Typography>
      <Button variant="contained" onClick={handleLastMonth} sx={{margin: 2}}>
        Last Month
      </Button>
      <Button variant="contained" onClick={handleNextMonth} sx={{margin: 2}}>
        Next
      </Button>
      <Grid container spacing={2}>
        {renderCalendarDays()}
      </Grid>
      {renderModal()}
    </div>
  );
};

export default Calendar;
