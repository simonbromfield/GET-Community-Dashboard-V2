import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import IntegratorEvents from '../../components/event/integratorEvents'
import { DashboardLayout } from '../../components/dashboard-layout'

const Post = () => {
  const router = useRouter()
  const { integrator } = router.query
    
  return (
    <>
      {
        integrator ?
          <IntegratorEvents integrator={integrator} />
          : null
      }
    </>
  )

}

class Trending extends React.Component {

  render() {
    return (
      <DashboardLayout>
      <>
      <Head>
        <title>
          Events | GET Protocol Community
        </title>
      </Head>
      <Post />
      </>
      </DashboardLayout>
    );
  }
}

export default Trending
