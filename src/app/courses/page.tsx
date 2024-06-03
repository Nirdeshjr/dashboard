"use client"

import React from 'react'
import Layout from '../components/Layout';
import Courses from './courses';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCourse from './addCourse';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const courses = () => {
    const [addcourse, setAddcourse] = useState(false);


    return (
        <Layout>
            <>
                {addcourse ? (
                    <div>
                        <div className="flex justify-start cursor-pointer" onClick={() => setAddcourse(false)}>
                            <ArrowBackIcon className='mr-2' />
                            <h2 className='font-bold mb-4'>Go Back</h2>
                        </div>
                        <AddCourse />
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between">
                            <h2 className='font-bold mb-4'>Courses</h2>
                            <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => setAddcourse(true)}>
                                Add Course
                            </Button>
                        </div>
                        <Courses />
                    </div>
                )}
            </>
        </Layout>
    )
}

export default courses
