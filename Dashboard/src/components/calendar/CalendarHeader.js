import React from "react";
import { Typography, Button, Box } from "@mui/material";

const CalendarHeader = ({ currentMonth, handleLastMonth, handleNextMonth }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <Button
        variant="text"
        onClick={handleLastMonth}
        sx={{ margin: 2, color: "green" }}
      >
        Previous
      </Button>
      <Typography variant="h4" component="h2" gutterBottom>
        {currentMonth}
      </Typography>
      <Button
        variant="text"
        onClick={handleNextMonth}
        sx={{ margin: 2, color: "green" }}
      >
        Next
      </Button>
    </Box>
  );
};

export default CalendarHeader;
