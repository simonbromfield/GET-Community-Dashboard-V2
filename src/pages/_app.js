import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import '../../public/static/CSS/loadingSVG.css'
import { useRouter } from 'next/router'
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../utils/config.json"
import LoadingSVG from '../components/loading/loadingSVG'

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const [loading, setLoading] = useState(false)
  const [wsdata, setwsdata] = useState(false)

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Dashboard connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      setwsdata(pageData)
      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };
  }, [])

  const getLayout = Component.getLayout ?? ((page) => page);
 
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          GET Protocol Community | Dashboard
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? 
            getLayout(<Component {...pageProps}
              wsdata={ wsdata } />)
          :
          <LoadingSVG />
          }
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
