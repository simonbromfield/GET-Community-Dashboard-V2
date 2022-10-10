import React from 'react';
import {
  Container,
  Typography
} from '@mui/material';

const NoTickets = (props) => {
  const { type } = props
  return (
    <>
      <Container>
      <Typography
          sx={{ mb: 3 }}
          variant="p"
        >
          No tickets within the last 1,000 interactions with: {type} type
        </Typography>
      </Container>
    </>
  )
}
export default NoTickets
