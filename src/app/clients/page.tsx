"use client"

import React from 'react'
import Layout from '../components/Layout';
import { useState } from 'react';
import Clients from './clients';

const page = () => {

    return (
        <Layout>
            <Clients />
        </Layout>
    )
}

export default page
