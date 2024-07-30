"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import axios from 'axios';
import Image from 'next/image';

//confirm alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

//toast
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import AddCourse from './addCourse';

//type
import { Course } from '@/types/course';

const Courses = () => {
    //data
    const [courseDeatil, setCoursesDetail] = useState<Course[]>([]);

    const getData = () => {
        axios.get("http://127.0.0.1:8000/api/course/")
            .then(response => {
                const fetchData = response.data;
                setCoursesDetail(fetchData);
                setCopyData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    //toogle move
    const [addcourse, setAddcourse] = useState(false);

    useEffect(getData, [addcourse]);


    const handleToogle = () => {
        setAddcourse(false);
    }

    //dropdown wehn clicked on the card 3 dots
    const [getIDToogle, setGetIDToogle] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setGetIDToogle(getIDToogle === id ? null : id);
    };

    //add function
    const [rows, setRows] = useState<Course>();
    const addFunction = () => {
        setAddcourse(true);
        setRows("");
        setGetIDToogle(null);
    }

    //edit functon
    const editFunction = (data: Course) => {
        setAddcourse(true);
        setRows(data);
        setGetIDToogle(null);
    }


    //delete function
    const deleteFunction = (data: Course) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteRow(data)
                },
                {
                    label: 'No',
                }
            ]
        });
        setGetIDToogle(null);
    }

    const deleteRow = async (data: Course) => {
        let id = data.id;

        axios.delete(`http://127.0.0.1:8000/api/course/${id}/`)
            .then(response => {
                toast('Deleted Successfully !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                getData();
            })
            .catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            });
    }

    //for search function 
    const [copyData, setCopyData] = useState<Course[]>([]);//copying to use later in the filtering process
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        searchData(searchQuery);
    }, [searchQuery])

    const searchData = (searchQuery: string) => {
        let filterData: Course[] = courseDeatil;
        if (searchQuery) {
            filterData = courseDeatil.filter(course =>
                course.course_name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
            )
            setCoursesDetail(filterData);
        }
        else {
            setCoursesDetail(copyData);
        }
    }

    return (
        <>
            {addcourse ? (
                <AddCourse handleTooglePage={handleToogle} rows={rows} />
            ) : (
                <>

                    <h2 className='font-bold mb-4'>Courses</h2>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder='search courses'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='mb-2 px-2 py-2 border-rounded'
                        />
                        <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
                            Add Course
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {courseDeatil.map((course, id) => (
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative" key={id}>
                                <div className="flex justify-end px-4 pt-4">
                                    <button
                                        id="dropdownButton"
                                        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5"
                                        type="button"
                                        onClick={() => toggleDropdown(course.id)}
                                    >
                                        <span className="sr-only">Open dropdown</span>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                    </button>
                                    {/* Dropdown menu */}
                                    <div
                                        id="dropdown"
                                        className={`z-10 ${getIDToogle === course.id ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-4 top-12`}
                                    >
                                        <ul className="py-2" aria-labelledby="dropdownButton">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => editFunction(course)}>Edit</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => deleteFunction(course)}>Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center pb-10">
                                    <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src={course.course_image || "/Images/course.png"} alt="Course image" width={90} height={70} />
                                    <h5 className="mb-1 text-xl font-medium text-gray-900">{course.course_name}</h5>
                                    <span className="text-sm text-gray-500 ">{course.duration} months</span>
                                    <div className="flex mt-4 md:mt-6">
                                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">See More Detail</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    );
};

export default Courses;
