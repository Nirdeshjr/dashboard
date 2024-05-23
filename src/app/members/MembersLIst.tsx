"use client"


import * as React from 'react';
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

export default function MemberList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const data: Members[] = [
    {
      name: 'Pasang',
      position: 'Senior Developer',
      salary: 10000,
      contact: 9811110000,
      working_days: 3,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima odio reprehenderit ipsa.',
    },
    {
      name: 'Sonam',
      position: 'Junior Developer',
      salary: 8000,
      contact: 9811120000,
      working_days: 5,
      description: 'Dolore magnam commodi quas numquam explicabo porro soluta quidem.',
    },
    {
      name: 'Lakpa',
      position: 'Project Manager',
      salary: 12000,
      contact: 9811130000,
      working_days: 4,
      description: 'Fugiat voluptate odio quam quis, natus sunt temporibus hic aliquam.',
    },
    {
      name: 'Tashi',
      position: 'UI/UX Designer',
      salary: 9000,
      contact: 9811140000,
      working_days: 3,
      description: 'Temporibus dolorem asperiores voluptate dicta ad magnam sequi.',
    },
    {
      name: 'Nima',
      position: 'System Analyst',
      salary: 11000,
      contact: 9811150000,
      working_days: 5,
      description: 'Nostrum placeat autem odio sunt quod veritatis consequuntur.',
    },
    {
      name: 'Karma',
      position: 'DevOps Engineer',
      salary: 11500,
      contact: 9811160000,
      working_days: 4,
      description: 'Repellendus tempora amet atque consectetur fugiat dolorum.',
    },
    {
      name: 'Pemba',
      position: 'Database Administrator',
      salary: 10500,
      contact: 9811170000,
      working_days: 5,
      description: 'Accusamus ipsam voluptas pariatur maiores suscipit est.',
    },
    {
      name: 'Dawa',
      position: 'Frontend Developer',
      salary: 9500,
      contact: 9811180000,
      working_days: 3,
      description: 'Inventore obcaecati veniam tempore modi incidunt quas.',
    },
    {
      name: 'Mingma',
      position: 'Backend Developer',
      salary: 10200,
      contact: 9811190000,
      working_days: 4,
      description: 'Deserunt blanditiis fuga labore libero nisi sunt.',
    },
    {
      name: 'Phurba',
      position: 'Software Tester',
      salary: 9800,
      contact: 9811200000,
      working_days: 5,
      description: 'Architecto exercitationem explicabo doloremque facilis deleniti.',
    },
    {
      name: 'Dorjee',
      position: 'Network Engineer',
      salary: 10800,
      contact: 9811210000,
      working_days: 4,
      description: 'Ratione excepturi nihil quo dolorum quaerat eveniet.',
    }
  ];


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteFunction = (data:Members) => {
    console.log(data);
  };

  const editFunction = (data:Members) => {
    console.log(data);
  };

  return (
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
                align="left"
                style={{ minWidth: "50" }}
              >
                <p className='font-bold'>Contatct</p> 
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
                      {data.name}
                    </TableCell>
                    <TableCell align='left' key={index}>
                      {data.position}
                    </TableCell>
                    <TableCell align='right' key={index}>
                      {data.salary}
                    </TableCell>
                    <TableCell align='center' key={index}>
                      {data.contact}
                    </TableCell>
                    <TableCell align='center' key={index}>
                      {data.working_days}
                    </TableCell>
                    <TableCell align='left' key={index}>
                      {data.description}
                    </TableCell>
                    <TableCell align='right' key={index}>
                      <div className='flex justify-center'>
                        <div className='cursor-pointer text-green-600 mr-2' onClick={()=>editFunction(data)}>
                          <EditIcon/>
                        </div>
                        <div className='cursor-pointer text-orange-600' onClick={()=>deleteFunction(data)}>
                          <DeleteIcon/>
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
  );
}
