import React, { useEffect, useState } from 'react'

import {
  Container,
  Box,
  ImageList,
  Card,
  ImageListItem,
  ImageListItemBar
} from '@mui/material'

import { DashboardLayout } from '../components/dashboard-layout';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import axios from 'axios'
const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const Integrators = (props) => {
  const [eventList, seteventList] = useState(null)
  const [integratorShowing, setIntegratorShowing] = useState(null)
  const [loading, setLoading] = useState(false)

  const getEventsFunction = async (name) => {
    try {
      if (name) {
        const data = await axios.post(getSubGraphURL, {
          query: `{
            integrators (where:{ isBillingEnabled: true, name: "${name}" } ) {
              events (orderBy: blockTimestamp, orderDirection: desc){
                id
                name
                integrator{
                  name
                }
                imageUrl
              }
            }
          }`
        }).then(res => {
          console.log(res)
          seteventList(res.data.data.integrators[0].events)
          setIntegratorShowing(name)
        })
      } else {
        const data = await axios.post(getSubGraphURL, {
          query: `{
            events (orderBy: blockTimestamp, orderDirection: desc) {
              id
                name
                integrator{
                  name
                }
                imageUrl
            }
          }`
        }).then(res => {
          console.log(res)
          seteventList(res.data.data.events)
          setIntegratorShowing("ALL")
        })
      }
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEventsFunction()
  }, [])

  const displayTicketsSold = () => {
    return (
      <>
      <ImageList gap={12}
sx={{ mb: 8, margin: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr)) !important' }} >
       {
          eventList.map(event => (
            <Card key={event.id}
sx={{ margin: 1, }} >
              <ImageListItem sx={{ height: '100% !important' }} >
                <ImageListItemBar sx={{ background: 'linear-gradient(to bottom), rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)1000%'
                  }}
                  title={event.name}
                />
                <img src={event.imageUrl}
alt={event.title}
loading='lazy'
                  sx={{
                    cursor: 'pointer'
                  }}
                />
              </ImageListItem>
            </Card>
        ))
        }
        </ImageList>
      </>      
    )
  }

  return (
      <>
        { loading ? displayTicketsSold() :
        <Container sx={{
          margin: 'auto'
        }}>
          <Box>
            <BookOnlineIcon />
            <p>loading...</p>
          </Box>
        </Container>
        }
    </>
  )
}

Integrators.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Integrators
