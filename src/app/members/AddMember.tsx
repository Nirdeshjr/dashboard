import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Members } from '@/types/members';

//for form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


//for tostify success after insert items
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//ckeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const schema = yup.object({
  name: yup.string().required("Might the name for sure"),
  position: yup.string().required("Know what they holds in the company."),
  description: yup.string().required("Do you know what roles they have?"),
  contact: yup.number().positive().integer().required("How would you contact them?"),
  working_days: yup.number().positive().integer().required("Track their working days."),

}).required();


const AddMember = () => {


  return (
    <>
      <ToastContainer />
      <form>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Position <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="position"
              id="position"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Salary <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="Salary"
              id="Salary"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Status <span className="text-red-500">*</span>
            </label>
            <br />
            <select id="status" name="status" className="border-2 border-gray-300 p-2 w-full double_input">
              <option value="" disabled selected>Select member status</option>
              <option value="working">Working</option>
              <option value="holiday">Holiday</option>
              <option value="parttime">Part-time</option>
              <option value="parttime">Remote</option>
            </select>
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Contact <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="tel"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="contact"
              id="contact"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Working Days (In Week) <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="work_days"
              id="work_days"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Profile <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="profile"
              id="profile"
              required
            />
          </div>
          
        </div>
        <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Description <span className="text-red-500">*</span>
            </label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              onInit={(editor) => {
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
              }}
            />
          </div>
        <div className="flex justify-end p-1">
          <button
            className="p-3 bg-blue-500 text-white hover:bg-blue-400">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default AddMember
