import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Profile from '../../components/integrator/profile'
import { DashboardLayout } from '../../components/dashboard-layout'

const IntegratorPofile = ({ wsdata }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <DashboardLayout>
      <>
      <Head>
        <title>
          Integrator Profile | GET Protocol Community
        </title>
      </Head>
      {
        id ?
          <Profile
                id={id}
                wsdata={wsdata}
            />
          :
          <h2>Error</h2>
      }
      </>
      </DashboardLayout>
    </>
  )
}

export default IntegratorPofile