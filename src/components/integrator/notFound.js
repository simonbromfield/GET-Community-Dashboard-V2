import React from 'react';
import {
  Container,
  Typography
} from '@mui/material';

const NotFound = (props) => {
  return (
    <>
      <Container>
      <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Integrator was not found
        </Typography>
        <Typography
          sx={{ mb: 3 }}
          variant="p"
        >
          Although many things could cause this issue, it may also be down to the ID you entered is not accociated with a configured Integrator.
        </Typography>
        
      </Container>
    </>
  )
}
export default NotFound
