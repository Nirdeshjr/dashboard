"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout'
import MembersLIst from './MembersLIst'
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddMember from './AddMember';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const page = () => {
    const [addUser, setAddUser] = useState(false);

    return (
        <>
            <Layout>
                <>
                    {addUser ? (
                        <div>
                            <div className="flex justify-start cursor-pointer" onClick={() => setAddUser(false)}>
                                <ArrowBackIcon className='mr-2' />
                                <h2 className='font-bold mb-4'>Go Back</h2>
                            </div>
                            <AddMember />
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between">
                                <h2 className='font-bold mb-4'>Members</h2>
                                <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => setAddUser(true)}>
                                    Add User
                                </Button>
                            </div>
                            <MembersLIst />
                        </div>
                    )};
                </>
            </Layout>
        </>
    )
}

export default page
