import React from 'react';
import axios from 'axios';

const getSubGraphURL =
  'https://gateway.thegraph.com/api/5cb3bc7942a919148db4e6a356a02b43/subgraphs/id/5S9b6URgphe9h19c5rQwAWd9aed1i1m1mHiqPKM1Fvvq';

class TopUps extends React.Component {
  constructor() {
    super();
    this.state = [];
  }

  componentDidMount() {
    axios
      .post(getSubGraphURL, {
        query: `
                {
                  topUpEvents(orderBy: blockTimestamp, orderDirection: desc, first: 15) {
                    integratorIndex
                    integrator {
                      name
                    }
                    total
                    totalUsd
                    price
                  }
                }
              `,
      })
      .then((res) => {
        this.setState(res.data.data.topUpEvents);
      });
  }

  render() {
    console.log(this.state);

    const customStyle = {
      margin: '0px',
    };

    return (
      <div>
        <h3 style={customStyle}>TOP UPS</h3>
      </div>
    );
  }
}

export default TopUps;
