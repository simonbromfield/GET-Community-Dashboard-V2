import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import '../../public/static/CSS/loadingSVG.css';
let W3CWebSocket = require('websocket').w3cwebsocket;
import LoadingSVG from '../components/loading/loadingSVG';
import 'font-awesome/css/font-awesome.min.css';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const [loading, setLoading] = useState(false);
  const [wsdata, setwsdata] = useState(false);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    const client = new W3CWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    client.onopen = () => {
      client.send(JSON.stringify({ action: 'dashboard' }));
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data);
      setwsdata(pageData);
      setLoading(true);
    };
    client.onerror = function () {
      console.log('Connection Error');
    };
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>GET Protocol Community | Dashboard</title>
        <meta name="viewport"
content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? (
            getLayout(<Component {...pageProps}
wsdata={wsdata} />)
          ) : (
            <LoadingSVG />
          )}
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
