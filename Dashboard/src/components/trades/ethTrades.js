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

const EthTrades = (props) => {
  const [ethTrades, setEthTrades] = useState(null);
  const [loading, setLoading] = useState(false);
  const ethSushiSubGraphURL =
    'https://api.thegraph.com/subgraphs/name/sushiswap/exchange';

  const recentEthTradesFunction = async () => {
    try {
      await axios
        .post(ethSushiSubGraphURL, {
          query: `
        {
          swaps (first:20, orderBy: timestamp, orderDirection: desc, where: {pair: "0xbb19141e045b133169d7c7160c5e54a54cc821b2"}){
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
          setEthTrades(res.data.data.swaps);
          console.log(res.data.data.swaps);
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    recentEthTradesFunction();
  }, []);

  function displayRecentEthTrades() {
    return (
      <>
        <Card
          sx={{
            margin: 2,
          }}
        >
          <CardHeader title="SushiSwap - Mainnet - Most recent 20" />
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
                {ethTrades.map((trade) => (
                  <TradeDataLine
                    key={trade.transaction.blockNumber}
                    blockNumber={trade.transaction.blockNumber}
                    amount={trade.amountUSD}
                    amount0In={trade.amount0In}
                    amount0Out={trade.amount0Out}
                    amount1In={trade.amount1In}
                    amount1Out={trade.amount1Out}
                    txlink={`https://etherscan.io/tx/${trade.transaction.id}`}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </>
    );
  }

  return <>{loading ? displayRecentEthTrades() : <LoadingSVG />}</>;
};

export default EthTrades;
