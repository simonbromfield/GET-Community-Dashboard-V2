import React from 'react';
import axios from 'axios';

const getSubGraphURL =
  'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph';

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
