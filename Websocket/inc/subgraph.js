const axios = require('axios')
const thegraphAPI = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

module.exports = {
  subgraphData: async () => {
    try {
      let subGraphData = await axios.post(
        thegraphAPI, {
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
        `
      })
      return subGraphData.data.data
    } catch (e) {
      return e
    }
  },
  allTimeTopEvents: async () => {
    try {
      let subGraphData = await axios.post(
        thegraphAPI, {
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
        `
      })
      return subGraphData.data.data.events
    } catch (e) {
      return e
    }
  },
  topDays: async () => {
    try {
      let subGraphData = await axios.post(
        thegraphAPI, {
        query: `
        {
          protocolDays(orderBy: reservedFuel, orderDirection: desc, first: 10) {
            day
            reservedFuel
            soldCount
            totalSalesVolume
          }
        } 
        `
      })
      return subGraphData.data.data.protocolDays
    } catch (e) {
      return e
    }
  }
}