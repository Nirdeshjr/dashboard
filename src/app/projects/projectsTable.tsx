import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

//icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

//data type
import { ProjectDataType } from '@/types/projects';



//this function is like a table that is called from the main function below which is the actual one i.e ProjectsTable 
function Projects(props: { row: ProjectDataType }) {

  const { row } = props;
  const [open, setOpen] = React.useState(false);

  //for status decoration 
  let statusCell;
  if (row.status === "Completed") {
    statusCell = <span className='text-white bg-green-500 py-2 px-2 rounded-lg'>{row.status}</span>;
  }
  else if (row.status === "In Progress") {
    statusCell = <span className='text-white bg-amber-500 py-2 px-2 rounded-lg'>{row.status}</span>;
  }
  else {
    statusCell = <span className='text-white bg-red-500 py-2 px-2 rounded-lg'>{row.status}</span>;
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.project_name}
        </TableCell>
        <TableCell align="center">{row.no_of_members}</TableCell>
        <TableCell align="center">{row.deadline}</TableCell>
        <TableCell align="center">{statusCell}</TableCell>
        <TableCell align="center">
          <div className='flex justify-center'>
            <div className='cursor-pointer text-green-600 mr-2'>
              <EditIcon />
            </div>
            <div className='cursor-pointer text-orange-600'>
              <DeleteIcon />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" className='font-bold'>
                Progress
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className='font-bold'>Date</TableCell>
                    <TableCell className='font-bold'>Updates</TableCell>
                    <TableCell align="center" className='font-bold'>Requirements</TableCell>
                    <TableCell align="center" className='font-bold'>Next Procedure</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell >{row.updates}</TableCell>
                    <TableCell align="center">{row.requirements}</TableCell>
                    <TableCell align="center">
                      {row.future_plans}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ProjectsTable = () => {

  //fetching the data from the api
  const [projectsData, setProjectsData] = useState<ProjectDataType[]>([]);

  const getData = () => {
    axios.get("http://127.0.0.1:8000/api/projects/")
      .then(response => {
        const fetchedData = response.data;
        setProjectsData(fetchedData);
      })
      .catch(err => {
        console.log("Error ", err);
      })
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className='font-bold'>Projects Name</TableCell>
              <TableCell align="center" className='font-bold'>Num Of Team</TableCell>
              <TableCell align="center" className='font-bold'>Deadline</TableCell>
              <TableCell align="center" className='font-bold'>Status</TableCell>
              <TableCell align="center" className='font-bold'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsData.map((row) => (
              <Projects key={row.project_name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProjectsTable
