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
import LoadingSVG from '../components/loading/loadingSVG'
let W3CWebSocket = require('websocket').w3cwebsocket;

const Integrators = (props) => {
  const [integrators, setIntegrators] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const client = new W3CWebSocket('ws://serene-reaches-92565.herokuapp.com/');
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      setIntegrators(pageData.integrators)
      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };
  }, [])

  const displayIntegrators = () => {
    return (
      <>
        <Container>
        <ul>
        {
          integrators.map(integrator => (
            <li key={integrator.id}>
            {integrator.name}
            </li>
          ))
          }
          </ul>
          </Container>
      </>      
    )
  }

  return (
    <>
      { loading ? displayIntegrators() :
        <LoadingSVG />
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
