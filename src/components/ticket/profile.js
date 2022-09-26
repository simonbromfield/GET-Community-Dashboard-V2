import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia
} from '@mui/material'
import axios from 'axios'
import { Margin } from '@mui/icons-material'
import LoadingSVG from '../loading/loadingSVG'

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const TicketProfile = (props) => {
  const { id } = props;
  
  const [ticketData, setTicketData] = useState(false)  
  const [loading, setLoading] = useState(false)

  const getProfileData = async (props) => {
    try {
      await axios.post(getSubGraphURL, {
        query: `{
          ticket(id: "${id}"){
            id
            integrator{
              name
            }
            reservedFuel
            basePrice
            usageEvents{
              type
              getUsed
              price
            }
            event{
              name
              imageUrl
            }
            isScanned
            isClaimed
            isCheckedIn
            isInvalidated
          }
        }                  
        `
      }
      ).then(res => {
        if (res.data.data.ticket.event.imageUrl == "") {
          res.data.data.ticket.event.imageUrl = "https://picsum.photos/300/200";
        }
        setTicketData(res.data.data.ticket)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  function displayTicketProfile() {
    return (<>
      <Box
        sx={{
          flexGrow: 1,
          margin: 4,
          padding: 2
        }}
      >
        <Grid container
          spacing={2}>
          <Grid item
            xs={6}>
            <Card
              sx={{
                padding: 2
              }}>
              <h2>#{ticketData.id}</h2>
              <h5>{ticketData.event.name}</h5>
              <h5>Issued by {ticketData.integrator.name}</h5>
            </Card>
          </Grid>
          <Grid item
            xs={6}>
            <CardMedia
              component="img"
              height="350"
              image={ticketData.event.imageUrl}
              alt={ticketData.event.name}
            />
          </Grid>
        </Grid>
      </Box>
    </>
    )
  }

  return (
    <>
      {loading ? displayTicketProfile() :
        <LoadingSVG />
      }
    </>
  )
}

export default TicketProfile