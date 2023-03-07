import React from 'react';
import { Button } from '@mui/material';

const customBtnStyle = {
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: '#64B292',
  color: '#fff',
  margin: 0.5,
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
};

const IntegratorEventsButtons = (props) => {
  const { key, name, linkId } = props;
  const link = `/events/${linkId}`;

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={customBtnStyle}
        key={key}
        href={link}
      >
        {name}
      </Button>
    </>
  );
};

export default IntegratorEventsButtons;
