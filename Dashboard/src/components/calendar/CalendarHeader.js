import React from "react";
import { Typography, Button } from "@mui/material";

const CalendarHeader = ({ currentMonth, handleLastMonth, handleNextMonth }) => {
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        {currentMonth}
      </Typography>
      <Button variant="contained" onClick={handleLastMonth} sx={{ margin: 2 }}>
        Previous
      </Button>
      <Button variant="contained" onClick={handleNextMonth} sx={{ margin: 2 }}>
        Next
      </Button>
    </>
  );
};

export default CalendarHeader;
