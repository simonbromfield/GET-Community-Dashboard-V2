import { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import OLMap from "./Map";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("./data/events.json");
      setEvents(response.data);
    };
    fetchData();
  }, []);

  const renderCalendarDays = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
      const dateEvents = events.filter(
        (event) => format(new Date(event.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      );

      return (
        <Grid item xs={12} sm={6} md={4} lg={2} key={day}>
          <div className="day"
            onClick={dateEvents.length > 0 ? () => handleOpen(day) : undefined}
          >
            <Typography variant="h6">{format(day, "d")}</Typography>
            {dateEvents.length > 0 && (
              <Typography>{dateEvents.length} event(s)</Typography>
            )}
          </div>
        </Grid>
      );
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleLastMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
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
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedDay ? format(selectedDay, "MMMM d, yyyy") : ""}
      </DialogTitle>
      <DialogContent>
        <List>
          {events
            .filter(
              (event) =>
                selectedDay &&
                format(new Date(event.date), "yyyy-MM-dd") ===
                  format(selectedDay, "yyyy-MM-dd")
            )
            .map((event) => (
              <ListItem key={event.id}>
                <ListItemText
                  primary={event.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {event.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Organized by: {event.organizer}
                      </Typography>
                      <OLMap lat={event.lat} lng={event.lng} />
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

  

  return (
    <div className="calendar">
      <Typography variant="h4" component="h2" gutterBottom>
        {format(currentMonth, "MMMM yyyy")}
      </Typography>
      <Button variant="contained" onClick={handleLastMonth}>
        Last Month
      </Button>
      <Button variant="contained" onClick={handleNextMonth}>
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
