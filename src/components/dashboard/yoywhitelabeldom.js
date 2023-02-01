import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { getColorByID } from '../../utils/helpers'
const unixTimestamp = (new Date().getTime()) / 1000;
const unixToday = Math.floor(unixTimestamp / 86400);
const unix30day = unixToday - 30

const API_URL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph';

function ExampleComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const query = `{
      integratorDays(orderBy: day, orderDirection: desc, where: { day_lt: ${unixToday-365}, day_gt: ${unix30day-365}, integrator_not_in: ["0", "1", "2", "3", "16", "17"] }, first: 1000) { 
          integrator { 
            id 
            name 
          } 
          day 
          soldCount 
        }
      }`;
      
      axios.post(API_URL, { query })
        .then(data => {
        const sold = data.data.data.integratorDays
        const integrators = sold.map(i => {
          if (i.integrator) {
            return {
              soldCount: i.soldCount,
              name: i.integrator.name,
              id: i.integrator.id
            }
          }
          return i;
        });
        
        const countedIntegrators = {};
        integrators.forEach(i => {
          if (!countedIntegrators[i.name]) {
            countedIntegrators[i.name] = {
              soldCount: 0,
              name: i.name,
              id: i.id
            }
          }
          countedIntegrators[i.name].soldCount += parseInt(i.soldCount);
        });
        const finalData = Object.values(countedIntegrators);
        const chartData = finalData.map(integrator => {
          return {
            label: integrator.name,
            data: integrator.soldCount,
            colour: getColorByID(integrator.id)
          }
        });
        setData(chartData);
      })
      .catch(error => console.error(error));

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
}

export default ExampleComponent;
