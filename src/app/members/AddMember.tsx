import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Members } from '@/types/members';

//for form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


//for tostify success after insert items
import { ToastContainer, toast ,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const schema = yup.object({
  name: yup.string().required("Might the name for sure"),
  position: yup.string().required("Know what they holds in the company."),
  description: yup.string().required("Do you know what roles they have?"),
  contact: yup.number().positive().integer().required("How would you contact them?"),
  working_days: yup.number().positive().integer().required("Track their working days."),

}).required();


const AddMember = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: Members) => {
    console.log(data);
    toast.success('Inserted Succesfully', {
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
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <TextField label="Name" size='small' variant='outlined' fullWidth {...register("name")} />
            <p className='text-orange-600 text-xs ml-1'>{errors.name?.message}</p>
          </div>
          <div>
            <TextField label="Position" size='small' variant='outlined' fullWidth {...register("position")} />
            <p className='text-orange-600 text-xs ml-1'>{errors.position?.message}</p>
          </div>
          <div>
            <TextField label="Salary" size='small' variant='outlined' fullWidth />
          </div>
          <div>
            <TextField label="Contact" size='small' variant='outlined' fullWidth {...register("contact")} />
            <p className='text-orange-600 text-xs ml-1'> {errors.contact?.message}</p>
          </div>
          <div>
            <TextField label="Working Days" size='small' variant='outlined' fullWidth {...register("working_days")} />
            <p className='text-orange-600 text-xs ml-1'>{errors.working_days?.message}</p>
          </div>
          <div>
            <TextField label="Description" size='small' variant='outlined' fullWidth {...register("description")} />
            <p className='text-orange-600 text-xs ml-1'>{errors.description?.message}</p>
          </div>
        </div>
        <div className="flex mt-2 justify-end">
          <Button variant="outlined" className='mb-2' type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default AddMember
