import React from "react";
import { Grid, Typography, Paper, Chip } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import moment from "moment";

const CalendarDay = ({ day, dateEvents, handleDayClick }) => {
  const today = moment().startOf('day');
  const calendarDay = moment(day).startOf('day');

  const borderColor = () => {
    const daysDiff = today.diff(calendarDay, "days");
    if (calendarDay.isAfter(today)) {
      return "purple";
    } else if (daysDiff < 7) {
      return "#ff9800";
    } else if (daysDiff < 30) {
      return "#4caf50";
    } else if (daysDiff <= 365) {
      return "#3f51b5";
    } else {
      return "red";
    }
  };

  const backgroundColor = calendarDay.isSame(today) ? "lightgray" : "transparent";

  return (
    <Grid item xs={12} sm={6} md={4} lg={2} sx={{ height: "200px" }}>
      <Paper
        variant="outlined"
        square
        elevation={3}
        sx={{
          height: "100%",
          padding: 2,
          cursor: dateEvents.length > 0 ? "pointer" : "default",
          borderColor: borderColor(),
          borderWidth: "3px",
          borderRadius: "8px",
          backgroundColor: backgroundColor,
          ":hover": {
            backgroundColor: dateEvents.length > 0 ? "rgba(0, 0, 0, 0.1)" : "inherit",
          },
        }}
        onClick={dateEvents.length > 0 ? () => handleDayClick(day) : undefined}
      >
        <div className="day">
          <Typography
            variant="p"
            sx={{
              marginBottom: 1,
              cursor: "pointer",
              display: "block",
              padding: 0,
            }}
          >
            {moment(day).format("D/M/YYYY")}
          </Typography>
          {dateEvents.length > 0 && (
            <>
              <Chip
                label={dateEvents.length + " events(s)"}
                sx={{
                  marginBottom: 1,
                  backgroundColor: "#59C399",
                  width: 1,
                  cursor: "pointer",
                }}
              />
              <Chip
                icon={<LocalGasStationIcon />}
                label={dateEvents.reduce(
                  (total, event) => total + parseFloat(event.reservedFuel),
                  0
                ).toFixed(2)}
                sx={{
                  marginBottom: 1,
                  width: 1,
                  cursor: "pointer",
                }}
              />
              <Chip
                icon={<ConfirmationNumberIcon />}
                label={dateEvents.reduce(
                  (total, event) => total + parseInt(event.soldCount),
                  0
                )}
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
};

export default CalendarDay;
