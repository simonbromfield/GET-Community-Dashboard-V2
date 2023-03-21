import { useEffect, useState, useMemo } from "react";
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
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Calendar = ({ events }) => {
  const [eventsList, setEvents] = useState(events);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(events)) {
      setEvents(events);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    if (!Array.isArray(events)) {
      return {};
    }
  
    const groupedEvents = events.reduce((acc, event) => {
      const date = format(new Date(moment.unix(event.startTime)), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  
    return groupedEvents;
  }, []);

  const renderCalendarDays = () => {
    if (loading) {
      return <LoadingSVG />;
    }
  
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
  
    return days.map((day) => {
      const formattedDate = format(day, "yyyy-MM-dd");
      const dateEvents = eventsByDate[formattedDate] || [];
  
      return (
        <Grid item xs={12} sm={6} md={4} lg={2} key={day} sx={{ height: "200px" }}>
        <Paper
          variant="outlined"
          square
          elevation={3}
          sx={{
            height: "100%",
            padding: 2,
            cursor: dateEvents.length > 0 ? "pointer" : "default",
            ":hover": {
              backgroundColor: dateEvents.length > 0 ? "rgba(0, 0, 0, 0.1)" : "inherit",
            },
          }}
          onClick={dateEvents.length > 0 ? () => handleDayClick(day) : undefined}
        >
          <div className="day">
              <Chip
                label={format(day, "d")}
                sx={{
                  marginBottom: 1,
                  backgroundColor: '#6EB7E4',
                  cursor: "pointer",
                }}/>
            {dateEvents.length > 0 && (
              <>
                <Chip
                    label={dateEvents.length + " events(s)"}
                    sx={{
                      marginBottom: 1,
                      backgroundColor: '#59C399',
                      width: 1,
                      cursor: "pointer",
                    }}
                />
                <Chip
                  icon={<LocalGasStationIcon />}
                    label={dateEvents.reduce((total, event) => total + parseFloat(event.reservedFuel), 0).toFixed(2)}
                    sx={{
                      marginBottom: 1,
                      width: 1,
                      cursor: "pointer",
                    }}
                />
                <Chip
                  icon={<ConfirmationNumberIcon />}
                    label={dateEvents.reduce((total, event) => total + parseInt(event.soldCount), 0)}
                    sx={{
                      marginBottom: 1,
                      width: 1,
                      cursor: "pointer",
                    }}
                />
                  
              </>
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

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      setOpen(true);
    }, 500); // Set the delay here, e.g., 500ms
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderModal = () => {
    return (
      <Backdrop open={open} onClick={handleClose}>
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
                <Paper variant="outlined" square sx={{ padding: 2 }}>
                  <ListItem key={event.id}>
                  <ListItemText
                    primary={event.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Integrator: {event.integrator.name}
                        </Typography>
                        <Chip
                          icon={<LocalGasStationIcon />}
                            label={parseFloat(event.reservedFuel).toFixed(2)}
                        />
                        <Chip
                          icon={<ConfirmationNumberIcon />}
                            label={parseInt(event.soldCount)}
                        />
                      </>
                    }
                  />
                  </ListItem>
                </Paper>
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
        Previous
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
