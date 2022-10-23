import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid
} from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout';
import IntegratorCard from '../components/integrator/card'

const Integrators = ({ wsdata }) => {
  const [integrators, setIntegrators] = useState(wsdata.integrators)

  useEffect(() => {
    setIntegrators(wsdata.integrators)
  }, [])

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
        <Grid
            container
            spacing={3}
          >
            {
              integrators.map(integrator => (
                <IntegratorCard
                  key={integrator.id}
                  data={integrator}
                />
              ))
                }
            </Grid>
        </Container>
      </Box>
    </>      
  )
}

Integrators.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Integrators
