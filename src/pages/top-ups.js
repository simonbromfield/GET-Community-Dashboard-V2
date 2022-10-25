import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import {
  Box,
  Grid,
  CardHeader,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Head from 'next/head'
import TopUpDataLine from '../components/topUps/topups'
import moment from 'moment'
import TableContainer from '@mui/material/TableContainer'
import {
  truncate,
  numberWithCommas
} from '../utils/helpers'
import LoadingSVG from '../components/loading/loadingSVG'
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};

const TopUps = ({ wsdata }) => {
  const [topUps, setTopUps] = useState(wsdata.topUpEvents)
  const [integrators, setIntegrators] = useState(wsdata.integrators.filter(i => i.isBillingEnabled === true))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIntegrators(wsdata.integrators.filter(i => i.isBillingEnabled === true))
    setTopUps(wsdata.topUpEvents)
    setLoading(true)
  }, [])

  const displayTopUps = () => {
    return (
      <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%"
        }}
      >
          <Grid container
            spacing={2}
          >
          <Grid item
            lg={8}
            md={12}
            xl={8}
            xs={12}>
              <Card sx={{
                margin: 2
              }}>
              <CardHeader
                  title="Recent Top Ups"
                />
                <TableContainer>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Time / Date
                        </TableCell>
                        <TableCell>
                          Integrator
                        </TableCell>
                        <TableCell>
                          GET Price
                        </TableCell>
                        <TableCell>
                          GET Total
                        </TableCell>
                        <TableCell>
                          Total $
                        </TableCell>
                        <TableCell>
                          TX
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      topUps.map(topUp => (
                        <TopUpDataLine
                          key={topUp.id}
                          blockTimestamp={moment.unix(topUp.blockTimestamp).format("HH:mm : DD/MM/YY")}
                          intagrator={topUp.integrator.name}
                          intagratorLink={`/integrator/${topUp.integrator.id}`}
                          getPrice={Number(topUp.price).toFixed(2)}
                          total={Number(topUp.total).toFixed(4)}
                          totalUsd={numberWithCommas(Number(topUp.totalUsd).toFixed(2))}
                          txlink={`https://polygonscan.com/tx/${topUp.txHash}`}
                        />
                      ))
                    }
                    </TableBody>
                  </Table>
                  </TableContainer>
              </Card>
            </Grid>
            <Grid item
              lg={4}
              md={12}
              xl={4}
              xs={12}>
              <Card sx={{
                margin: 2
              }}>
              <CardHeader
                title="Integrators"
                />

                <List sx={style}
                  component="nav"
                  aria-label="mailbox folders"
                >
                <Divider />
                {
                  integrators.map(integrator => (
                    <>
                        <ListItemButton component="a"
                          href={`/integrator/${integrator.id}`}>
                          <ListItemText
                            primary={truncate(integrator.name, 25)}
                            secondary={`Available Fuel: ${numberWithCommas(Number(integrator.availableFuel).toFixed(2))} GET`}
                          />
                        </ListItemButton>
                      <Divider />
                    </>
                  ))
                }
                </List>
              </Card>
            </Grid>
          </Grid>
          </Box>
      </>      
    )
  }

  return (
    <>
        { loading ? displayTopUps() :
          <LoadingSVG />
        }
    </>
  )
}

TopUps.getLayout = (page) => (
  <>
  <Head>
    <title>
      Integrator Top Ups | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default TopUps
