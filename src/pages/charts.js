import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Card,
  Typography,
  Stack,
  Button
} from '@mui/material'
import Head from 'next/head'
import { DashboardLayout } from '../components/dashboard-layout';
import LineGraph from '../components/dashboard/line'
import FuelGraph from '../components/dashboard/fuelGraph'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  jsonToCsv,
  protocolDayToFormattedDate,
  usd
} from '../utils/helpers'

const Charts = ({ wsdata }) => {
  const [protocolDays, setProtocolDays] = useState(wsdata.protocolDays)

  const handleDownload = () => {

    const updatedData = protocolDays.map(x => {
      x.dateString = protocolDayToFormattedDate(Number(x.day))
      x.totalSalesVolume = usd(Number(x.totalSalesVolume))
      return x;
    });

    // Convert jsonData to CSV format
    const csvData = jsonToCsv(updatedData);

    // Create a Blob object containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '365ProtocolDays.csv';
    link.click();
  };

  useEffect(() => {
    setProtocolDays(wsdata.protocolDays)
  }, [])
    
  return (
    <>
        <Container maxWidth={false}>
          <Grid
          container
          marginTop={2}
            spacing={3}
          >
            <Grid item
              lg={12}
              sm={12}
              xs={12}>
              <Card
                sx={{
                  height: '100%',
                marginBottom: 2,
                  padding: 4
                }}
            >
              <Typography gutterBottom
              variant="p"
              component="div"
              margin={2}
              marginBottom={0}
            >
              Reserved Fuel
            </Typography>
                <FuelGraph
                  protocolDays={protocolDays}
                />
            </Card>
          </Grid>
          <Grid item
              lg={12}
              sm={12}
              xs={12}>
              <Card
                sx={{
                  height: '100%',
                marginBottom: 2,
                  padding: 4
                }}
            >
              <Typography gutterBottom
              variant="p"
              component="div"
              margin={2}
              marginBottom={0}
            >
              Ticket Interactions
            </Typography>
                <LineGraph
                  protocolDays={protocolDays}
                />
            </Card>
          </Grid>
        </Grid>
        <Stack direction="row"
          spacing={2}
          margin={4}
        >
          <Button
            variant="outlined"
            onClick={handleDownload}
            startIcon={<FileDownloadIcon />
            }>
            Download protocolDays as CSV.
          </Button>
        </Stack>
      </Container>
    </>
  )
}


Charts.getLayout = (page) => (
  <>
  <Head>
    <title>
      Charts | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Charts
