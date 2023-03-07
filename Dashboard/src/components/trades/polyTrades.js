import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSVG from '../loading/loadingSVG';
import TableContainer from '@mui/material/TableContainer';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
} from '@mui/material';

import TradeDataLine from './tradeDataLine';

const PolyTrades = (props) => {
  const [polyTrades, setPolyTrades] = useState(null);
  const [loading, setLoading] = useState(false);
  const polySushiSubGraphURL =
    'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange';

  const recentPolyTradesFunction = async () => {
    try {
      await axios
        .post(polySushiSubGraphURL, {
          query: `
        {
          swaps (first:20, orderBy: timestamp, orderDirection: desc, where: {pair: "0x55bc7d9e44b730c4a42b52c818c805476156d9c9"}){
            transaction{
              id
              blockNumber
            }
            pair{
              token0{ 
                name
              }
              token1{
                name
              }
            }
            amount0In
            amount0Out
            amount1In
            amount1Out
            amountUSD
            timestamp
          }
        } 
                `,
        })
        .then((res) => {
          setPolyTrades(res.data.data.swaps);
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    recentPolyTradesFunction();
  }, []);

  function displayRecentPolyTrades() {
    return (
      <>
        <Card
          sx={{
            margin: 2,
          }}
        >
          <CardHeader title="SushiSwap - MATIC (Polygon) - Most recent 20" />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>BUY/SELL</TableCell>
                  <TableCell>VALUE</TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>WETH</TableCell>
                  <TableCell>TX</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {polyTrades.map((trade) => (
                  <TradeDataLine
                    key={trade.transaction.blockNumber}
                    blockNumber={trade.transaction.blockNumber}
                    amount={trade.amountUSD}
                    amount0In={trade.amount1In}
                    amount0Out={trade.amount1Out}
                    amount1In={trade.amount0In}
                    amount1Out={trade.amount0Out}
                    txlink={`https://polygonscan.com/tx/${trade.transaction.id}`}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </>
    );
  }

  return <>{loading ? displayRecentPolyTrades() : <LoadingSVG />}</>;
};

export default PolyTrades;
