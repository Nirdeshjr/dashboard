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
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddProjects from './addProjects';

// Confirm alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Toast messages
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Data type
import { ProjectDataType } from '@/types/projects';

type ProjectsProps = {
  row: ProjectDataType;
  editFunction: (data: ProjectDataType) => void;
  deleteFunction: (data: ProjectDataType) => void;
};

const Projects: React.FC<ProjectsProps> = (props) => {
  const { row, editFunction, deleteFunction } = props;
  const [open, setOpen] = React.useState(false);

  let statusCell;
  if (row.status === "Completed") {
    statusCell = <span className='text-white bg-green-500 py-2 px-2 rounded-lg'>{row.status}</span>;
  } else if (row.status === "In Progress") {
    statusCell = <span className='text-white bg-amber-500 py-2 px-2 rounded-lg'>{row.status}</span>;
  } else {
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
              <EditIcon onClick={() => editFunction(row)} />
            </div>
            <div className='cursor-pointer text-orange-600'>
              <DeleteIcon onClick={() => deleteFunction(row)} />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" className='font-bold'>
                <div className="flex justify-between">
                  <div className="progress">
                    <p>Progress</p>
                  </div>
                  <div className="Add ml-2">
                    <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
                      Add Progress
                    </Button>
                  </div>
                </div>
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
                    <TableCell>{row.updates}</TableCell>
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
};

const ProjectsTable = () => {
  const [projectsData, setProjectsData] = useState<ProjectDataType[]>([]);
  const [copyData, setCopyData] = useState<ProjectDataType[]>([]);
  const [addProjectStatus, setAddProjectStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rows, setRows] = useState<ProjectDataType | null>(null);

  const getData = () => {
    axios.get("http://127.0.0.1:8000/api/projects/")
      .then(response => {
        const fetchedData = response.data;
        const sortedData = fetchedData.sort((a: ProjectDataType, b: ProjectDataType) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
        setProjectsData(sortedData);
        setCopyData(sortedData);
      })
      .catch(err => {
        console.log("Error ", err);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery, copyData]);

  const handleProjects = () => {
    setAddProjectStatus(false);
  }

  const addFunction = () => {
    setAddProjectStatus(true);
    setRows(null);
  }

  const editFunction = (data: ProjectDataType) => {
    setAddProjectStatus(true);
    setRows(data);
  }

  const deleteFunction = (data: ProjectDataType) => {
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
  }

  const deleteRow = async (data: ProjectDataType) => {
    let id = data.id;

    axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`)
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

  const searchData = (searchQuery: string) => {
    if (searchQuery) {
      const filteredData = copyData.filter(project =>
        project.project_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProjectsData(filteredData);
    } else {
      setProjectsData(copyData);
    }
  };

  return (
    <>
      {addProjectStatus ? (
        <AddProjects handleProjectsToogle={handleProjects} data={rows || {}} />
      ) : (
        <>
          <ToastContainer />
          <h2 className='font-bold mb-4'>Projects</h2>
          <div className="flex justify-between mb-2">
            <div>
              <input
                type="text"
                placeholder='search vacancies'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='mb-2 px-2 py-2 border-rounded'
              />
            </div>
            <Button variant="outlined" endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
              Add Project
            </Button>
          </div>
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
                  <Projects key={row.id} row={row} editFunction={editFunction} deleteFunction={deleteFunction} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default ProjectsTable;
