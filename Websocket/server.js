'use strict';

const express = require('express');
const { Server } = require('ws');
const cors = require('cors');
let connectedClients = 0;

const app = require('express')();
app.use(cors());

const PORT = process.env.PORT || 3001;
const INDEX = './index.html';
const http = require('http');
const subgraph = require('./inc/subgraph.js');

setInterval(() => {
  http.get('https://serene-reaches-92565.herokuapp.com');
}, 15 * 60 * 1000); // every 15 minutes

const runWebSocket = async () => {
  try {
    const subGraph = require('./inc/subgraph.js');

    var allEventsCache = [];

    async function updateAllEventsData() {
      try {
        const allEvents = await subgraph.allEvents();
        allEventsCache = allEvents; // Update the cache with the latest data
        console.log('allEvents data updated');
      } catch (error) {
        console.error('Error updating allEvents data:', error);
      }
    }
    // Update allEvents data initially
    updateAllEventsData();
    // Schedule the updateAllEventsData() function to run every 5 minutes (300000 ms)
    setInterval(updateAllEventsData, 300000);


    var pageData = await subGraph.subgraphData();
    var topEvents = await subGraph.allTimeTopEvents();
    var topDays = await subGraph.topDays(); 
    var topEventsAllTime = {};
    topEventsAllTime.allTimeTop = topEvents;
    var topDaysObj = {};
    topDaysObj.topDays = topDays;
    var mergedObject = Object.assign(
      {},
      pageData,
      topEventsAllTime,
      topDaysObj
    );
  } catch (err) {
    console.log(err);
  }

  const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

  const wss = new Server({ server });

  setInterval(async () => {
    const subGraph = require('./inc/subgraph.js');
    pageData = await subGraph.subgraphData();
    topEvents = await subGraph.allTimeTopEvents();
    topDays = await subGraph.topDays();
    topEventsAllTime.allTimeTop = topEvents;
    topDaysObj.topDays = topDays;
    mergedObject = Object.assign({}, pageData, topEventsAllTime, topDaysObj);
  }, 60 * 1000); // every minute

  wss.on('connection', (ws) => {
    connectedClients++;
    console.log(connectedClients);
  
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.action === 'requestAllEvents') {
        ws.send(JSON.stringify(allEventsCache));
        setInterval(() => {
          wss.clients.forEach(async (client) => {
            ws.send(JSON.stringify(allEventsCache));
          });
        }, 60 * 1000); // every minute
      }
      if (parsedMessage.action === 'dashboard') {
        ws.send(JSON.stringify(mergedObject));
      }
    });
  
    ws.on('close', (ws) => {
      console.log(`client gone`);
      connectedClients--;
    });
  });

  setInterval(() => {
    wss.clients.forEach(async (client) => {
      console.log(`data update`);
      client.send(JSON.stringify(mergedObject));
    });
  }, 60 * 1000); // every minute
};

runWebSocket();
