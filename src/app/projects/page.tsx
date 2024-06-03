"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddProjectStatus from './addProjectStatus';
import ProjectsTable from './projectsTable';

const page = () => {
    const [addProjectStatus, setAddProjectStatus] = useState(false);

    return (
        <>
            <Layout>
                <>
                    {addProjectStatus ? (
                        <div>
                            <div className="flex justify-start cursor-pointer" onClick={() => setAddProjectStatus(false)}>
                                <ArrowBackIcon className='mr-2' />
                                <h2 className='font-bold mb-4'>Go Back</h2>
                            </div>
                            <AddProjectStatus />
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between">
                                <h2 className='font-bold mb-4'>Projects</h2>
                                <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => setAddProjectStatus(true)}>
                                    Add Project
                                </Button>
                            </div>
                            <ProjectsTable />
                        </div>
                    )}
                </>
            </Layout>
        </>
    )
}

export default page
