import * as React from 'react'
import IntegratorButtons from './integratorButtons'
import { Container } from '@mui/material';

const customEventNavStyle = {
  maxWidth: '100%',
  padding: '15px'
};

export default function EventsMenu(props) {
  const { integrators } = props
  return (
    <Container sx={customEventNavStyle}>
      <IntegratorButtons
        integrators={ integrators } />
    </Container>
  )
}
