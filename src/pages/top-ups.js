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
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import axios from 'axios'
import Head from 'next/head'
import TopUpDataLine from '../components/topUps/topups'
import moment from 'moment'
import TableContainer from '@mui/material/TableContainer'
import { truncate } from '../utils/helpers'
import LoadingSVG from '../components/loading/loadingSVG'
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const TopUps = (props) => {

  const [topUps, setTopUps] = useState(false)
  const [integrators, setIntegrators] = useState(false)
  const [loading, setLoading] = useState(false)

  const getTopUps = async (name) => {
    try {
      await axios.post(getSubGraphURL, {
        query: `{
          topUpEvents(orderBy: blockTimestamp, orderDirection: desc, first: 15) {
            id
            integrator{
              name
              id
            }
            total
            totalUsd
            price
            blockNumber
            blockTimestamp
            txHash
          }
          integrators(where:{ isBillingEnabled: true }, orderBy: name) {
            id
            name
            availableFuel
          }
        }`
      }).then(res => {

        setIntegrators(res.data.data.integrators)
        setTopUps(res.data.data.topUpEvents)

      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getTopUps()
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
                          totalUsd={Number(topUp.totalUsd).toFixed(2)}
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
                      <ListItem>
                        <ListItemButton component="a"
                          href={`/integrator/${integrator.id}`}>
                          <ListItemText
                            primary={truncate(integrator.name, 25)}
                            secondary={`Available Fuel: ${Number(integrator.availableFuel).toFixed(4)}GET`}
                          />
                        </ListItemButton>
                      </ListItem>
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
