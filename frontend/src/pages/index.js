import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import LineGraph from '../components/dashboard/line';
import ActivityTopTile from '../components/activity/activitytopTile';
import {
  Box,
  Container,
  TableContainer,
  Card,
  Grid,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  List,
  Divider,
  ListItemButton,
  ListItemText,
  Button,
  CardContent,
} from '@mui/material';
import TopUpDataLine from '../components/topUps/topups';
import TotalTicketsSold from '../components/dashboard/totalTicketsSold';
import moment from 'moment';
import TokenPrice from '../components/dashboard/tokenPrice';
import MarketCapApp from '../components/dashboard/marketCap';
import { truncate } from '../utils/helpers';
import { DashboardLayout } from '../components/dashboard-layout';
import ThirtyDayAverageFuel from '../components/dashboard/30dayAverageFuel';

const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};

const Index = ({ wsdata }) => {
  const [protocolData, setProtocolData] = useState(wsdata.protocol);
  const [protocolDays, setProtocolDays] = useState(wsdata.protocolDays);
  const [topUps, setTopUps] = useState(wsdata.topUpEvents);
  const [integrators, setIntegrators] = useState(
    wsdata.integrators.filter((i) => i.isBillingEnabled === true)
  );
  const [recentUsage, setRecentUsageList] = useState(wsdata.usageEvents);

  useEffect(() => {
    setProtocolData(wsdata.protocol);
    setIntegrators(
      wsdata.integrators.filter((i) => i.isBillingEnabled === true)
    );
    setTopUps(wsdata.topUpEvents);
    setProtocolDays(wsdata.protocolDays);
    setRecentUsageList(wsdata.usageEvents);
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={12} xs={12}>
              <TotalTicketsSold
                sx={{ height: '100%' }}
                protocolData={protocolData}
              />
              <ThirtyDayAverageFuel />
            </Grid>
            <Grid item lg={6} sm={12} xs={12}>
              <Card
                sx={{
                  height: '100%',
                  marginBottom: 2,
                }}
              >
                <LineGraph protocolDays={protocolDays} />
              </Card>
            </Grid>
            <Grid item lg={3} sm={12} xs={12}>
              <Card
                sx={{
                  height: '100%',
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <TokenPrice sx={{ height: '100%' }} />
                  <MarketCapApp sx={{ height: '100%' }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid container spacing={2} margin={2}>
              {recentUsage.slice(0, 4).map((usage) => (
                <>
                  <ActivityTopTile
                    key={recentUsage.length - 1}
                    blockTimestamp={usage.blockTimestamp}
                    eventName={truncate(usage.event.name, 10)}
                    integrator={usage.event.integrator.name}
                    getUsed={usage.getUsed}
                    activityType={usage.type}
                    price={usage.price}
                    imageUrl={usage.event.imageUrl}
                  />
                </>
              ))}
              <Grid item lg={3} sm={12} xs={12}>
                <Button variant="contained" href="/recent-activity">
                  Recent Activity
                </Button>
              </Grid>
            </Grid>

            <Grid item lg={8} xs={12}>
              <Card
                sx={{
                  margin: 2,
                }}
              >
                <CardHeader title="Recent Integrator Top Ups" />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time / Date</TableCell>
                        <TableCell>Integrator</TableCell>
                        <TableCell>GET Price</TableCell>
                        <TableCell>GET Total</TableCell>
                        <TableCell>Total $</TableCell>
                        <TableCell>TX</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topUps.slice(0, 5).map((topUp) => (
                        <TopUpDataLine
                          key={topUp.id}
                          blockTimestamp={moment
                            .unix(topUp.blockTimestamp)
                            .format('HH:mm : DD/MM/YY')}
                          intagrator={topUp.integrator.name}
                          intagratorLink={`/integrator/${topUp.integrator.id}`}
                          getPrice={Number(topUp.price).toFixed(2)}
                          total={Number(topUp.total).toFixed(2)}
                          totalUsd={Number(topUp.totalUsd).toFixed(2)}
                          txlink={`https://polygonscan.com/tx/${topUp.txHash}`}
                        />
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <Button size="large" href="/top-ups/">
                          View more
                        </Button>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Card
                sx={{
                  margin: 2,
                }}
              >
                <CardHeader title="Integrators" />

                <List sx={style} component="nav" aria-label="mailbox folders">
                  <Divider />
                  {integrators.map((integrator) => (
                    <>
                      <ListItemButton
                        component="a"
                        href={`/integrator/${integrator.id}`}
                      >
                        <ListItemText primary={truncate(integrator.name, 25)} />
                      </ListItemButton>
                      <Divider />
                    </>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Index.getLayout = (page) => (
  <>
    <Head>
      <title>Dashboard | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default Index;
