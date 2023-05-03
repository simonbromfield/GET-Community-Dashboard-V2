import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

const ControlsHeader = ({ onSort, onToggle }) => {
  const handleSortByName = () => {
    onSort((a, b) => a.name.localeCompare(b.name));
  };

  const handleSortByDate = () => {
    onSort((a, b) => parseInt(a.startTime) - parseInt(b.startTime));
  };

  const handleIntegratorFilter = (event, newIntegrators) => {
    onToggle(newIntegrators);
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={handleSortByName}>Sort by Name</Button>
        <Button onClick={handleSortByDate}>Sort by Date</Button>
      </ButtonGroup>
    </Box>
  );
};

export default ControlsHeader;
