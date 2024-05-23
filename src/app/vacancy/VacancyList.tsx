"use client"

import * as React from 'react';
import { useEffect, useState } from 'react';

//for table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

//icon for table
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//axios
import axios from 'axios';

//conform alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

//toast
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import extra files
import { Vacancies } from '@/types/vacancy';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

//files import
import EditVacancy from './EditVacancy';
import AddVacancy from './AddVacancy';
import { string } from 'prop-types';




const VacancyList = () => {
    //for redirectin add and edit
    const [addVacancy, setAddVacancy] = useState(false);
    const [rows, setRows] = useState<Vacancies>();
    const handleAddVacancy = () => {
        setAddVacancy(false);
    }

    //for table page
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = useState<Vacancies[]>([]);
    const [copyData, setCopyData] = useState<Vacancies[]>([]);//copying to use later in the filtering process

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //for setting data using api
    useEffect(() => {
        getData();
    }, [addVacancy]);


    const getData = () => {
        axios.get("http://127.0.0.1:8000/api/vacancy/")
            .then(response => {
                setData(response.data);
                setCopyData(response.data);
            })
            .catch(err => {
                console.log("Error ", err);
            })
    }

    const deleteFunction = (data: Vacancies) => {

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
    };

    const deleteRow = async (data: Vacancies) => {
        let id = data.id;

        axios.delete(`http://127.0.0.1:8000/api/vacancies/${id}/`)
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
                toast.error(error, {
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

    const editFunction = (data: Vacancies) => {
        setAddVacancy(true);
        setRows(data);
    };

    const addFunction = () => {
        setAddVacancy(true);
        setRows("");
    };

    //for searhc function 
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        searchData(searchQuery);
    }, [searchQuery])

    const searchData = (searchQuery: string) => {
        let filterData: Vacancies[] = data;
        if (searchQuery) {
            filterData = data.filter(vacancy =>
                vacancy.job_title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.position_type.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.location.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.company_overview.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.description.toLowerCase().includes(searchQuery.toLocaleLowerCase())
            )
            setData(filterData);
        }
        else {
            setData(copyData);
        }
    }


    //table responsive sizes
    const [widthTable, setWidthTable] = useState<number>(0);
    const [screenWidth, setScreenwidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenwidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);


        if (screenWidth < 600 && screenWidth > 0) {
            setWidthTable(300);
            console.log(widthTable);
        }
        else if (screenWidth < 900 && screenWidth > 600) {
            setWidthTable(800);
            console.log(widthTable);
        }
        else if (screenWidth > 900) {
            setWidthTable(1400);
            console.log(widthTable);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, [screenWidth])


    return (
        <div style={{ overflowX: 'auto' }}>
            <ToastContainer />
            {addVacancy ? (<AddVacancy handleAddVacancy={handleAddVacancy} rows={rows} />) : (
                <>
                    <h2 className='font-bold mb-4'>Vacacny</h2>
                    <div className="flex justify-between">
                        <div>
                            <input
                                type="text"
                                placeholder='search vacancies'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='mb-2 px-2 py-2 border-rounded'
                            />
                        </div>
                        <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
                            Add Vacancy
                        </Button>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{
                            maxHeight: 440,
                            maxWidth: `${widthTable}px`
                        }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="left"
                                            className='font-'
                                        >
                                            <p className='font-bold'>Job Title</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>Position</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>Location</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>Experience</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>Company Overview</p>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <p className='font-bold'>Deadline</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>No Of Hiring</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>Description</p>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <p className='font-bold'>Action</p>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((data, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1}>
                                                    <TableCell align='left' key={index}>
                                                        {data.job_title}
                                                    </TableCell>
                                                    <TableCell align='left' key={index}>
                                                        {data.position_type}
                                                    </TableCell>
                                                    <TableCell align='left' key={index}>
                                                        {data.location}
                                                    </TableCell>
                                                    <TableCell align='center' key={index}>
                                                        {data.no_experience}
                                                    </TableCell>
                                                    <TableCell align='left' key={index}>
                                                        {data.company_overview}
                                                    </TableCell>
                                                    <TableCell align='center' key={index}>
                                                        {data.deadline}
                                                    </TableCell>
                                                    <TableCell align='center' key={index}>
                                                        {data.no_of_hiring}
                                                    </TableCell>
                                                    <TableCell align='left' key={index} dangerouslySetInnerHTML={{ __html: data.description }} />
                                                    <TableCell align='left' key={index}>
                                                        <div className='flex justify-center'>
                                                            <div className='cursor-pointer text-green-600 mr-2' onClick={() => editFunction(data)}>
                                                                <EditIcon />
                                                            </div>
                                                            <div className='cursor-pointer text-orange-600' onClick={() => deleteFunction(data)}>
                                                                <DeleteIcon />
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper></>
            )}

        </div>
    )
}

export default VacancyList
