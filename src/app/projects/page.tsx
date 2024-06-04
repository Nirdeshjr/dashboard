"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout';
import ProjectsTable from './projectsTable';

const page = () => {

    return (
        <>
            <Layout>
                <ProjectsTable />
            </Layout>
        </>
    )
}

export default page
