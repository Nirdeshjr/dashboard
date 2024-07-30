"use client"


import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Members } from '@/types/members';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from '@mui/material/Button';

//componenets
import AddMember from "./AddMember"

//axios
import axios from 'axios';

//confirm alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

//toast
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MemberList() {

  //page change
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //to toogle
  const [addUser, setAddUser] = useState(false);
  const handleChange = () => {
    setAddUser(false);
  }

  //data fetch
  const [data, setData] = useState<Members[]>([]);
  const [rows, setRows] = useState<Members>();


  const getData = () => {
    axios.get("http://127.0.0.1:8000/api/member/")
      .then(response => {
        const fetchedData = response.data;
        const sortedData = fetchedData.sort((a: Members, b: Members) => a.member_name.localeCompare(b.member_name));
        setData(sortedData);
        setCopyData(response.data);
      })
      .catch(err => {
        console.log("Error ", err);
      })
  }

  useEffect(() => {
    getData();
  }, [addUser]);

  //add function
  const addFunction = () => {
    setAddUser(true);
    setRows("")
  }

  //edit fucntion
  const editFunction = (data: Members) => {
    setAddUser(true);
    setRows(data);
  };


  //delete function
  const deleteFunction = (data: Members) => {
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


  const deleteRow = async (data: Members) => {
    let id = data.id;

    axios.delete(`http://127.0.0.1:8000/api/member/${id}/`)
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
  const [copyData, setCopyData] = useState<Members[]>([]);//copying to use later in the filtering process
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery])

  const searchData = (searchQuery: string) => {
    let filterData: Members[] = data;
    if (searchQuery) {
      filterData = data.filter(member =>
        member.member_name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
      setData(filterData);
    }
    else {
      setData(copyData);
    }
  }

  return (
    <>
      {addUser ? (
        <AddMember handleAddSection={handleChange} rows={rows} />

      ) : (
        <>
          <ToastContainer />
          <h2 className='font-bold mb-4'>Members</h2>
          <div className="flex justify-between mb-2">
            <input
              type="text"
              placeholder='search members'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-2 px-2 py-2 border-rounded'
            />
            <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
              Add User
            </Button>
          </div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100" }}
                    >
                      <p className='font-bold'>Name</p>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100" }}
                    >
                      <p className='font-bold'>Position</p>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ minWidth: "50" }}
                    >
                      <p className='font-bold'>Salary</p>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ minWidth: "50" }}
                    >
                      <p className='font-bold'>Contact</p>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ minWidth: "50" }}
                    >
                      <p className='font-bold'>Working Days</p>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ minWidth: "50" }}
                    >
                      <p className='font-bold'>Description</p>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ minWidth: "100" }}
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
                            {data.member_name}
                          </TableCell>
                          <TableCell align='left' key={index}>
                            {data.position}
                          </TableCell>
                          <TableCell align='right' key={index}>
                            {data.salary}
                          </TableCell>
                          <TableCell align='center' key={index}>
                            {data.phone}
                          </TableCell>
                          <TableCell align='center' key={index}>
                            {data.working_days}
                          </TableCell>
                          <TableCell align='center' key={index}>
                            {data.description}
                          </TableCell>
                          <TableCell align='right' key={index}>
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
          </Paper>
        </>
      )}
    </>
  );
}
