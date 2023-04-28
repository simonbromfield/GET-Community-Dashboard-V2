import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import moment from "moment";
import LoadingSVG from "../loading/loadingSVG";
import FuelStats from "./FuelStats";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import DayDetailsDialog from "./DayDetailsDialog";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";

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
    console.log(eventsList);
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
      const formattedDate = moment(day).format("YYYY-MM-DD");
      const dateEvents = eventsByDate[formattedDate] || [];

      return (
        <CalendarDay
          key={day}
          day={formattedDate}
          dateEvents={dateEvents}
          handleDayClick={handleDayClick}
        />
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

  const formattedSelectedDay = selectedDay ? moment(selectedDay).format("MMMM D, YYYY") : null;

    return (
      <div className="calendar">
        <Typography
          variant="p"
          sx={{
            marginBottom: 1,
            display: "block",
            padding: 0,
          }}
        >The following days show the number of tickets sold for events occurring on those specific dates, as well as the quantity of GET set aside as fuel for those tickets.
        </Typography>
        <FuelStats events={eventsList} />
        <CalendarHeader
          currentMonth={format(currentMonth, "MMMM yyyy")}
          handleLastMonth={handleLastMonth}
          handleNextMonth={handleNextMonth}
        />
        <Grid container spacing={2}>
          {renderCalendarDays()}
        </Grid>
        <DayDetailsDialog
          open={open}
          handleClose={handleClose}
          selectedDay={selectedDay}
          eventsList={eventsList}
          formattedSelectedDay={formattedSelectedDay}
        />
      </div>
    );
  };

  export default Calendar;
