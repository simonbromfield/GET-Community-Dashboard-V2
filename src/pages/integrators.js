import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout';
import IntegratorCard from '../components/integrator/card'

const Integrators = ({ wsdata }) => {
  const [integrators, setIntegrators] = useState(wsdata.integrators.filter(i => i.isBillingEnabled === true))
  const [sortBy, setSortBy] = useState("fuel")

  useEffect(() => {
    setIntegrators(wsdata.integrators.filter(i => i.isBillingEnabled === true))
    setSortBy("fuel")

  }, [])

  const handleChange = (event, sortBy) => {
    switch (sortBy) {
      case "integratorName":
        integrators.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
            return 0;
        });
        setSortBy("integratorName")
        return
      case "eventCount":
        integrators.sort((a, b) => {
          return a.eventCount - b.eventCount
        });
        integrators.reverse()
        setSortBy("eventCount")
        return
      case "fuel":
        setIntegrators(wsdata.integrators.filter(i => i.isBillingEnabled === true))
        setSortBy("fuel")
        return
      case "soldCount":
        integrators.sort((a, b) => {
          return a.soldCount - b.soldCount
        });
        integrators.reverse()
        setSortBy("soldCount")
        return
    default:
        setIntegrators(wsdata.integrators.filter(i => i.isBillingEnabled === true))
        return
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography gutterBottom
          variant="p"
          component="div"
          margin={2}
          marginBottom={0}
        >
          Sort by
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={sortBy}
          exclusive
          onChange={handleChange}
          sx={{ padding: 2 }}
        >
          <ToggleButton value={"integratorName"}>Name</ToggleButton>
          <ToggleButton value={"eventCount"}>Event Count</ToggleButton>
          <ToggleButton value={"fuel"}>Available Fuel</ToggleButton>
          <ToggleButton value={"soldCount"}>Tickets Sold</ToggleButton>
        </ToggleButtonGroup> 
        
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
