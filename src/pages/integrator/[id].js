import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Profile from '../../components/integrator/profile'
import { DashboardLayout } from '../../components/dashboard-layout'

const Post = () => {
  const router = useRouter()
  const { id } = router.query
    
  return (
    <>
      {
        id ?
          <Profile id={id} />
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
          Integrator Profile | GET Protocol Community
        </title>
      </Head>
      <Post />
      </>
      </DashboardLayout>
    );
  }
}

export default Trending