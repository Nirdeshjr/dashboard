" use client"
import React from 'react';
import Layout from '../components/Layout';
import Dashboard from './dashboard';
import DashTable from "./table"

const page = () => {
  return (
    <div>
      <Layout>
        <Dashboard/>
        <DashTable/>
      </Layout>
    </div>
  )
}

export default page
