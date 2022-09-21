import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Button
} from '@mui/material'
import IntegratorEventsButtons from './navButtons/integratorButtons'
import axios from 'axios'

const customBtnStyle = {
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: '#64B292',
  color: '#fff',
  margin: 0.5,
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
}


const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const customIntegratorBtnStyle = {
  color: "white"
};

const IntegratorButtons = (props) => {

  const [integrators, setIntegrators] = useState(null)
  const [loading, setLoading] = useState(false)

  const getIntegarators = async () => {
    try {
      const data = await axios.post(getSubGraphURL, {
        query: `
                {
                  integrators(where:{ isBillingEnabled: true }, orderBy: name) {
                    id
                    name
                  }
                }
                `
      }
      ).then(res => {
        setIntegrators(res.data.data.integrators)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getIntegarators()
  }, [])

  const displayIntegrators = () => {
    return (
      <>
        <Button
              variant="outlined"
              size="small"
              sx={customBtnStyle}
              key='0'
              href='/events/'
          >
          ALL
        </Button>
        

      {
          integrators.map(integrator => (            
            <IntegratorEventsButtons 
              key={integrator.id}
              name={integrator.name}
              linkId={integrator.id}
            />
        ))
      }
      </>      
    )
  }

  return (
      <>
        { loading ? displayIntegrators() :          
        <Box sx={{ width: '100%' }}>
          <CircularProgress color="secondary" />
        </Box>
        }
    </>
  )
}

export default IntegratorButtons
