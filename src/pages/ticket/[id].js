import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import TicketProfile from '../../components/ticket/profile'
import { DashboardLayout } from '../../components/dashboard-layout'

const Post = () => {
  const router = useRouter()
  const { id } = router.query
    
  return (
    <>
      {
        id ?
          <TicketProfile id={id} />
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
          Ticket Profile | GET Protocol Community
        </title>
      </Head>
      <Post />
      </>
      </DashboardLayout>
    );
  }
}

export default Trending