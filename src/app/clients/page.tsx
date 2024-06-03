"use client"

import React from 'react'
import Layout from '../components/Layout';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Clients from './clients';
import AddClients from './addClients';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const page = () => {
    const [addClients, setAddClients] = useState(false);


    return (
        <Layout>
            <>
                {addClients ? (
                    <div>
                        <div className="flex justify-start cursor-pointer" onClick={() => setAddClients(false)}>
                            <ArrowBackIcon className='mr-2' />
                            <h2 className='font-bold mb-4'>Go Back</h2>
                        </div>
                        <AddClients />
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between">
                            <h2 className='font-bold mb-4'>Clients</h2>
                            <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => setAddClients(true)}>
                                Add Clients
                            </Button>
                        </div>
                        <Clients />
                    </div>
                )}
            </>
        </Layout>
    )
}

export default page
