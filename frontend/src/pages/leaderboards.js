import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import {
  Grid,
  CardHeader,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import Head from 'next/head';
import LeaderboardDataLine from '../components/leaderboard/dataline';
import DayDataLine from '../components/leaderboard/dayDataline';
import TableContainer from '@mui/material/TableContainer';
import {
  truncate,
  numberWithCommas,
  protocolDayToDateInFull,
} from '../utils/helpers';
import LoadingSVG from '../components/loading/loadingSVG';

const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};

const Leaderboards = ({ wsdata }) => {
  const [leaderboard, setLeaderboard] = useState(wsdata.allTimeTop);
  const [topDays, setTopDays] = useState(wsdata.topDays);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLeaderboard(wsdata.allTimeTop);
    setTopDays(wsdata.topDays);
    setLoading(true);
  }, []);

  const displayTopUps = () => {
    return (
      <>
        <Grid container>
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <Card
              sx={{
                margin: 2,
              }}
            >
              <CardHeader title={`Top Days by GET reserved`}></CardHeader>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Day</TableCell>
                      <TableCell>GET Reserved</TableCell>
                      <TableCell>Tickets Sold</TableCell>
                      <TableCell>Sales Volume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topDays.map((day, index) => (
                      <DayDataLine
                        key={index}
                        postion={index + 1}
                        day={protocolDayToDateInFull(day.day)}
                        fuel={numberWithCommas(
                          Number(day.reservedFuel).toFixed(2)
                        )}
                        soldCount={numberWithCommas(Number(day.soldCount))}
                        salesVolume={numberWithCommas(
                          Number(day.totalSalesVolume).toFixed(2)
                        )}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <Card
              sx={{
                margin: 2,
              }}
            >
              <CardHeader
                title={`Top Events of all time by GET reserved`}
              ></CardHeader>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Integrator</TableCell>
                      <TableCell>GET Reserved</TableCell>
                      <TableCell>Tickets</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboard.map((event, index) => (
                      <LeaderboardDataLine
                        key={index}
                        postion={index + 1}
                        eventName={truncate(event.name, 10)}
                        eventLink={`/event/${event.id}`}
                        intagrator={event.integrator.name}
                        intagratorLink={`/integrator/${event.integrator.id}`}
                        fuel={numberWithCommas(
                          Number(event.reservedFuel).toFixed(2)
                        )}
                        soldCount={numberWithCommas(Number(event.soldCount))}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  };

  return <>{loading ? displayTopUps() : <LoadingSVG />}</>;
};

Leaderboards.getLayout = (page) => (
  <>
    <Head>
      <title>Leaderboards | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default Leaderboards;
