"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout'
import MembersLIst from './MembersLIst'

const page = () => {

    return (
        <>
            <Layout>
                <MembersLIst />
            </Layout>
        </>
    )
}

export default page
