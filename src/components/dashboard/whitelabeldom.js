import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { getColorByID } from '../../utils/helpers'

const API_URL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const query = `
      {
        integrators(where: {id_not_in: ["0", "1", "2", "3", "16", "17", "19", "20", "21"], isBillingEnabled: true}) {
          id
          soldCount
          name
        }
      }
    `;

    axios.post(API_URL, { query })
      .then(response => {
        const chartData = response.data.data.integrators.map(integrator => {
          return {
            label: integrator.name,
            data: integrator.soldCount,
            colour: getColorByID(integrator.id)
          }
        });
        setData(chartData);
      })
      .catch(error => {
        console.error(error);
      });
    
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Pie data={{
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.data),
        backgroundColor: data.map(d => d.colour),
      }],
    }} />
  );
};

export default MyComponent;
