const axios = require('axios');
const thegraphAPI =
  'https://gateway.thegraph.com/api/5cb3bc7942a919148db4e6a356a02b43/subgraphs/id/5S9b6URgphe9h19c5rQwAWd9aed1i1m1mHiqPKM1Fvvq';

module.exports = {
  subgraphData: async () => {
    try {
      let subGraphData = await axios.post(thegraphAPI, {
        query: `
        {
          protocol(id: "1") {
            soldCount
            eventCount
            reservedFuel
            collectedSpentFuel
            spentFuel
          }
          protocolDays(orderBy: day, orderDirection: desc, first: 1000) {
            soldCount
            resoldCount
            scannedCount
            claimedCount
            eventCount
            reservedFuel
            totalSalesVolume
            day
          }
          usageEvents(orderBy: blockTimestamp, orderDirection: desc, first: 1000) {
            blockTimestamp
            type
            nftId
            event {
              id
              name
              imageUrl
              integrator{
                id
                name
              }
            }
            getUsed
            getUsedProtocol
            price
          }   
          topUpEvents(orderBy: blockTimestamp, orderDirection: desc) {
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
          integrators(orderBy: availableFuel, orderDirection: desc) {
            id
            averageReservedPerTicket
            availableFuel
            reservedFuel
            reservedFuelProtocol
            currentReservedFuel
            currentReservedFuelProtocol
            spentFuel
            spentFuelProtocol
            price
            activeTicketCount
            isBillingEnabled
            isConfigured
            salesTaxRate
            name
            eventCount
            topUpCount
            soldCount
            invalidatedCount
            resoldCount
            scannedCount
            checkedInCount
            claimedCount
            integratorDays(orderBy: day, orderDirection: desc, first: 365) {
              day
              soldCount
              resoldCount
              claimedCount
              scannedCount
              availableFuel
            }
            events(orderBy: reservedFuel, orderDirection: desc){
              id
              name
              soldCount
              reservedFuel
            }
          }
          events (orderBy: blockTimestamp, orderDirection: desc, first: 1000) {
            id
            name
            imageUrl
            shopUrl
            startTime
            endTime
            createTx
            integrator{
              id
              name
            }
          }
        } 
        `,
      });
      return subGraphData.data.data;
    } catch (e) {
      return e;
    }
  },
  allTimeTopEvents: async () => {
    try {
      let subGraphData = await axios.post(thegraphAPI, {
        query: `
        {
          events(orderBy: reservedFuel, orderDirection: desc, first: 10) {
            id
            name
            soldCount
            reservedFuel
            integrator{
              name
              id
            }
          }
        } 
        `,
      });
      return subGraphData.data.data.events;
    } catch (e) {
      return e;
    }
  },
  topDays: async () => {
    try {
      let subGraphData = await axios.post(thegraphAPI, {
        query: `
        {
          protocolDays(orderBy: reservedFuel, orderDirection: desc, first: 10) {
            day
            reservedFuel
            soldCount
            totalSalesVolume
          }
        } 
        `,
      });
      return subGraphData.data.data.protocolDays;
    } catch (e) {
      return e;
    }
  },
  allEvents: async () => {
    try {
      let allEventData = [];
      let batchSize = 1000;
      let uniqueIds = new Set();
  
      let lastTimestamp = null;
      let hasMoreData = true;
  
      while (hasMoreData) {
        let subGraphData = await axios.post(thegraphAPI, {
          query: `
          {
            events (orderBy: blockTimestamp, orderDirection: desc, first: ${batchSize}${lastTimestamp ? `, where: {blockTimestamp_lte: "${lastTimestamp}"}` : ''}) {
              id
              name
              imageUrl
              shopUrl
              startTime
              endTime
              longitude
              latitude
              createTx
              scannedCount
              soldCount
              checkedInCount
              invalidatedCount
              reservedFuel
              integrator{
                id
                name
              }
              blockTimestamp
            }
          } 
          `,
        });
  
        let eventData = subGraphData.data.data.events;
        
        if (!eventData || eventData.length === 0) {
          hasMoreData = false;
        } else {
          let uniqueFetchedData = eventData.filter(event => {
            if (!uniqueIds.has(event.id)) {
              uniqueIds.add(event.id);
              return true;
            }
            return false;
          });
  
          if(uniqueFetchedData.length > 0) {
            allEventData = allEventData.concat(uniqueFetchedData);
            lastTimestamp = uniqueFetchedData[uniqueFetchedData.length - 1].blockTimestamp;
  
            console.log(`batched - new length = ${allEventData.length}`);
          } else {
            hasMoreData = false;
          }
        }
      }
  
      function getObjectSizeInKB(obj) {
        const jsonString = JSON.stringify(obj);
        const bytes = new TextEncoder().encode(jsonString).length;
        return bytes / 1024;
      }
  
      console.log(`Object size: ${getObjectSizeInKB(allEventData)} KB`);
  
      return allEventData;
    } catch (e) {
      throw e;
    }
  }
     
};
