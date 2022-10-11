import React from 'react';
import {
  Card,
  CardHeader,
  Grid,
  Typography
} from '@mui/material';
import LineGraph from '../dashboard/line'

const IntegratorCard = (props) => {
  const { data } = props
  return (
    <Grid item
    lg={3}
    sm={12}
    xs={12}>
      <Card
      sx={{
        minHeight: 400
      }}
      >
        <CardHeader title={data.name} />
        <LineGraph
          sx={{minHeight: 500}}
          protocolDays={data.integratorDays.slice(0, 7)}
          />
      </Card> 
    </Grid>
  )
}
export default IntegratorCard
